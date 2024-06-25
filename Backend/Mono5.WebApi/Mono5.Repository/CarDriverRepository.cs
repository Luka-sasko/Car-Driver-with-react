using System.Collections.Generic;
using System.Threading.Tasks;
using Npgsql;
using Mono5.Model;
using Mono5.Repository.Common;
using System;
using Mono5.Common;
using System.Linq;
using System.Text;
using System.Reflection;

namespace Mono5.Repository
{
    public class CarDriverRepository : ICarDriverRepository
    {
        private const string CONNECTION_STRING = "Host=localhost:5432;" +
         "Username=postgres;" +
         "Password=postgres;" +
         "Database=Car";

        public async Task<Car> FindCarById(int id)
        {
            Car car = null;

            using (var connection = new NpgsqlConnection(CONNECTION_STRING))
            {
                await connection.OpenAsync();

                using (var cmd = new NpgsqlCommand("SELECT * FROM \"Car\" WHERE \"Id\" = @id", connection))
                {
                    cmd.Parameters.AddWithValue("@id", id);

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            car = new Car(
                                (int)reader["Id"],
                                (string)reader["Model"],
                                (string)reader["Brand"],
                                (int)reader["ManufacturYear"]);
                        }
                    }
                }
            }

            return car;
        }

        public async Task<Driver> FindDriverById(int id)
        {
            Driver driver = null;

            using (var connection = new NpgsqlConnection(CONNECTION_STRING))
            {
                await connection.OpenAsync();

                using (var cmd = new NpgsqlCommand("SELECT * FROM \"Driver\" WHERE \"Id\" = @id", connection))
                {
                    cmd.Parameters.AddWithValue("@id", id);

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            driver = new Driver(
                                (int)reader["Id"],
                                (string)reader["FirstName"],
                                (string)reader["LastName"],
                                (string)reader["Contact"]);
                        }
                    }
                }
            }

            return driver;
        }

    public async Task AddCarDriver(int carId, int driverId)
        {
            using (var connection = new NpgsqlConnection(CONNECTION_STRING))
            {
                await connection.OpenAsync();

                Guid newId = Guid.NewGuid(); 

                using (var cmd = new NpgsqlCommand("INSERT INTO \"CarDriver\"(\"Id\", \"CarId\", \"DriverId\") VALUES (@id, @carId, @driverId)", connection))
                {
                    cmd.Parameters.AddWithValue("@id", newId);
                    cmd.Parameters.AddWithValue("@carId", carId);
                    cmd.Parameters.AddWithValue("@driverId", driverId);

                    await cmd.ExecuteNonQueryAsync();
                }
            }
        }

        public async Task DeleteCarDriver(int driverId, int carId)
        {
            using (var connection = new NpgsqlConnection(CONNECTION_STRING))
            {
                await connection.OpenAsync();

                using (var cmd = new NpgsqlCommand("DELETE FROM \"CarDriver\" WHERE \"DriverId\" = @driverId AND \"CarId\" = @carId", connection))
                {
                    cmd.Parameters.AddWithValue("@driverId", driverId);
                    cmd.Parameters.AddWithValue("@carId", carId);

                    await cmd.ExecuteNonQueryAsync();
                }
            }
        }

        public async Task<int> UpdateCarDriver(int driverId, int carId, int newDriverId)
        {
            int numOfAffectedRows = 0;

            using (var connection = new NpgsqlConnection(CONNECTION_STRING))
            {
                await connection.OpenAsync();

                using (var cmd = new NpgsqlCommand("UPDATE \"CarDriver\" SET \"DriverId\" = @newDriverId WHERE \"DriverId\" = @driverId AND \"CarId\" = @carId", connection))
                {
                    cmd.Parameters.AddWithValue("@newDriverId", newDriverId);
                    cmd.Parameters.AddWithValue("@driverId", driverId);
                    cmd.Parameters.AddWithValue("@carId", carId);

                    numOfAffectedRows = await cmd.ExecuteNonQueryAsync();
                }
            }

            return numOfAffectedRows;
        }

        public async Task<IEnumerable<CarDriver>> GetAllCarsDrivers(Paging paging, Sorting sorting, CarDriverFiltering carDriverFiltering)
        {
            var carDrivers = new List<CarDriver>();

            try
            {
                using (var connection = new NpgsqlConnection(CONNECTION_STRING))
                {
                    await connection.OpenAsync();

                    var queryBuilder = new StringBuilder();
                    queryBuilder.AppendLine(@"
                SELECT 
                    cd.""CarId"", cd.""DriverId"", 
                    d.""FirstName"" as ""DriverFirstName"", d.""LastName"" as ""DriverLastName"",
                    c.""Model"" as ""CarModel"", c.""Brand"" as ""CarBrand"", c.""ManufacturYear"" as ""CarManufacturYear""
                FROM 
                    ""CarDriver"" cd
                INNER JOIN 
                    ""Driver"" d ON cd.""DriverId"" = d.""Id""
                INNER JOIN 
                    ""Car"" c ON cd.""CarId"" = c.""Id""
                WHERE 1 = 1");

                    using (var cmd = new NpgsqlCommand())
                    {
                        if (!string.IsNullOrEmpty(carDriverFiltering.DriverFirstName))
                        {
                            queryBuilder.Append(" AND d.\"FirstName\" ILIKE @DriverFirstName");
                            cmd.Parameters.AddWithValue("@DriverFirstName", $"%{carDriverFiltering.DriverFirstName}%");
                        }

                        if (!string.IsNullOrEmpty(carDriverFiltering.DriverLastName))
                        {
                            queryBuilder.Append(" AND d.\"LastName\" ILIKE @DriverLastName");
                            cmd.Parameters.AddWithValue("@DriverLastName", $"%{carDriverFiltering.DriverLastName}%");
                        }

                        if (!string.IsNullOrEmpty(carDriverFiltering.Model))
                        {
                            queryBuilder.Append(" AND c.\"Model\" ILIKE @Model");
                            cmd.Parameters.AddWithValue("@Model", $"%{carDriverFiltering.Model}%");
                        }

                        if (!string.IsNullOrEmpty(carDriverFiltering.Brand))
                        {
                            queryBuilder.Append(" AND c.\"Brand\" ILIKE @Brand");
                            cmd.Parameters.AddWithValue("@Brand", $"%{carDriverFiltering.Brand}%");
                        }

                        if (carDriverFiltering.ManufacturYear > 0)
                        {
                            queryBuilder.Append(" AND c.\"ManufacturYear\" = @ManufacturYear");
                            cmd.Parameters.AddWithValue("@ManufacturYear", carDriverFiltering.ManufacturYear);
                        }

                        if (!string.IsNullOrEmpty(sorting.SortBy))
                        {
                            bool sorted = sorting.IsAsc ?? true;
                            queryBuilder.Append($" ORDER BY \"{sorting.SortBy}\" {(sorted ? "ASC" : "DESC")}");
                        }

                        queryBuilder.Append(" LIMIT @PageSize OFFSET @Offset");
                        cmd.Parameters.AddWithValue("@PageSize", paging.PageSize);
                        cmd.Parameters.AddWithValue("@Offset", (paging.PageNumber - 1) * paging.PageSize);

                        cmd.Connection = connection;
                        cmd.CommandText = queryBuilder.ToString();

                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                carDrivers.Add(new CarDriver
                                {
                                    CarId = (int)reader["CarId"],
                                    DriverId = (int)reader["DriverId"],
                                    DriverFirstName = (string)reader["DriverFirstName"],
                                    DriverLastName = (string)reader["DriverLastName"],
                                    CarModel = (string)reader["CarModel"],
                                    CarBrand = (string)reader["CarBrand"],
                                    CarManufacturYear = (int)reader["CarManufacturYear"]
                                });
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching car drivers: {ex.Message}");
                throw; // Ili obradi ili propagiraj grešku prema gore
            }

            return carDrivers;
        }

    }
}
