using Mono5.Common;
using Mono5.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mono5.Service.Common
{
    public interface ICarDriverService
    {
        Task<Driver> FindDriverById(int id);
        Task<Car> FindCarById(int id);
        Task<IEnumerable<CarDriver>> GetCarDrivers(Paging paging, Sorting sorting, CarDriverFiltering carDriverFiltering);
        Task DeleteCarDriver(int driverId, int carId);
        Task UpdateCarDriver(int carId, int driverId, int newDriverId);
        Task AddCarDriver(int carId, int driverId);
    }
}
