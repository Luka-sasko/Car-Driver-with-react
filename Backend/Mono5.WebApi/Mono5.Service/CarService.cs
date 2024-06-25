using Mono5.Common;
using Mono5.Model;
using Mono5.Repository.Common;
using Mono5.Service.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mono5.Service
{
    public class CarService : ICarService
    {
        private readonly ICarRepository CarRepository;

        public CarService(ICarRepository carRepository)
        {
            CarRepository = carRepository;
        }

        public async Task<Car> AddCar(Car car)
        {
            if (car == null)
                throw new ArgumentException("Car cannot be null");
            await CarRepository.AddCar(car);
            return await CarRepository.FindCarById(car.Id);
        }

        public async Task<Car> DeleteCar(int id)
        {
            var car = await CarRepository.FindCarById(id);
            if (car == null)
                throw new ArgumentException("Car not found");
            await CarRepository.DeleteCar(id);
            return car;
        }

        public async Task<IEnumerable<Car>> GetCars(Paging paging, Sorting sorting, CarFiltering carFilter)
        {
            return await CarRepository.GetCars(paging,sorting,carFilter);
        }

        public async Task<Car> GetCarById(int id)
        {
            var car = await CarRepository.FindCarById(id);
            if (car == null)
                throw new ArgumentException("Car not found");
            return car;
        }

        public async Task<Car> UpdateCar(int id, CarUpdate editedCar)
        {
            var car = await CarRepository.FindCarById(id);
            if (car == null)
                throw new ArgumentException("Car not found");
            await CarRepository.UpdateCar(id, editedCar);
            return await CarRepository.FindCarById(id);
        }
    }
}
