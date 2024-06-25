using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mono5.Model
{
    public class Car
    {
        public Car() { }
        public Car(int id, string model, string brand, int manufacturYear)
        {
            Id = id;
            Model = model;
            Brand = brand;
            ManufacturYear = manufacturYear;

        }

        public int Id { get; set; }
        public string Model { get; set; }
        public string Brand { get; set; }
        public int ManufacturYear { get; set; }
        public List<Driver> CarDriver { get; set; }

    }
}
