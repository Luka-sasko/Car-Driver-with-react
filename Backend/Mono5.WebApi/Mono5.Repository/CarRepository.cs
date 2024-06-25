using System.Collections.Generic;
using System.Threading.Tasks;
using Npgsql;
using Mono5.Model;
using Mono5.Repository.Common;
using System.Text;
using System.Web.Http;
using Mono5.Common;
using Microsoft.Extensions.Logging;

namespace Mono5.Repository
{
    public class CarRepository : ICarRepository
    {
        private const string CONNECTION_STRING = "Host=localhost:5432;" +
         "Username=postgres;" +
         "Password=postgres;" +
         "Database=Car";

        public async Task<IEnumerable<Car>> GetCars(Paging paging, Sorting sorting, CarFiltering carFilter)
        {
            var cars = new List<Car>();

            if (carFilter != null)
            {
                using (var connection = new NpgsqlConnection(CONNECTION_STRING))
                {
                    await connection.OpenAsync();

                    var queryBuilder = new StringBuilder("SELECT * FROM \"Car\" WHERE 1 = 1");

                    using (var cmd = new NpgsqlCommand())
                    {
                        bool sorted = false;
                        if (!string.IsNullOrEmpty(carFilter.Model))
                        {
                            queryBuilder.Append(" AND \"Model\" = @Model");
                            cmd.Parameters.AddWithValue("@Model", carFilter.Model);
                        }

                        if (!string.IsNullOrEmpty(carFilter.Brand))
                        {
                            queryBuilder.Append(" AND \"Brand\" =" +
                                " @Brand");
                            cmd.Parameters.AddWithValue("@Brand", carFilter.Brand);
                        }

                        if (carFilter.ManufacturYear > 0)
                        {
                            queryBuilder.Append(" AND \"ManufacturYear\" = @ManufacturYear");
                            cmd.Parameters.AddWithValue("@ManufacturYear", carFilter.ManufacturYear);
                        }

                        if (!string.IsNullOrEmpty(sorting.SortBy))
                        {
                            if(sorting.IsAsc == null )
                                 sorted = true;
                            if(sorting.IsAsc.HasValue)
                                sorted= sorting.IsAsc.Value;
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
                                cars.Add(new Car(
                                    (int)reader["Id"],
                                    (string)reader["Model"],
                                    (string)reader["Brand"],
                                    (int)reader["ManufacturYear"]));
                            }
                        }
                    }
                }
            }
            return cars;
        }




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

        public async Task<Car> UpdateCar(int id, CarUpdate editedCar)
        {
            Car car = await FindCarById(id);

            using (var connection = new NpgsqlConnection(CONNECTION_STRING))
            {
                await connection.OpenAsync();

                using (var cmd = new NpgsqlCommand("UPDATE \"Car\" SET \"Model\" = @model, \"Brand\" = @brand, \"ManufacturYear\" = @manufacturYear WHERE \"Id\" = @id", connection))
                {
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@model", editedCar.Model);
                    cmd.Parameters.AddWithValue("@brand", editedCar.Brand);
                    cmd.Parameters.AddWithValue("@manufacturYear", editedCar.ManufacturYear);

                    await cmd.ExecuteNonQueryAsync();
                }
            }
            return await FindCarById(id);
        }

        public async Task<Car> DeleteCar(int id)
        {
            using (var connection = new NpgsqlConnection(CONNECTION_STRING))
            {
                await connection.OpenAsync();

                using (var cmd = new NpgsqlCommand("DELETE FROM \"Car\" WHERE \"Id\" = @id", connection))
                {
                    cmd.Parameters.AddWithValue("@id", id);

                    await cmd.ExecuteNonQueryAsync();
                }
            }
            return await FindCarById(id);
        }

        public async Task<Car> AddCar(Car newCar)
        {
            using (var connection = new NpgsqlConnection(CONNECTION_STRING))
            {
                await connection.OpenAsync();

                using (var cmd = new NpgsqlCommand("INSERT INTO \"Car\" (\"Id\", \"Model\", \"Brand\", \"ManufacturYear\") VALUES (@id, @model, @brand, @manufacturYear)", connection))
                {
                    cmd.Parameters.AddWithValue("@id", newCar.Id);
                    cmd.Parameters.AddWithValue("@model", newCar.Model);
                    cmd.Parameters.AddWithValue("@brand", newCar.Brand);
                    cmd.Parameters.AddWithValue("@manufacturYear", newCar.ManufacturYear);

                    await cmd.ExecuteNonQueryAsync();
                }
            }
            return await FindCarById(newCar.Id);
        }
    }
}
