using Mono5.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mono5.Common;
namespace Mono5.Repository.Common
{
    public interface ICarRepository
    {
        Task<IEnumerable<Car>> GetCars(Paging pagin, Sorting sorting, CarFiltering carFiltering);
        Task <Car> FindCarById(int id);
        Task<Car> DeleteCar(int id);
        Task<Car> UpdateCar(int id, CarUpdate updatedCar);
        Task<Car> AddCar(Car car);
    }
}
