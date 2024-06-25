using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mono5.Model;
using Mono5.Common;
namespace Mono5.Service.Common
{
    public interface ICarService
    {
        Task<Car> GetCarById(int id);
        Task<IEnumerable<Car>> GetCars(Paging paging, Sorting sorting, CarFiltering carFiltering);
        Task<Car> AddCar(Car car);
        Task<Car> UpdateCar(int id, CarUpdate editedCar);
        Task<Car> DeleteCar(int id);
    }
}
