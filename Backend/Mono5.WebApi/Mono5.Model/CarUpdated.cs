using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mono5.Model
{
    public class CarUpdate
    {
        public CarUpdate() { }
        public CarUpdate(string model, string brand, int manufacturYear)
        {
            Model = model;
            Brand = brand;
            ManufacturYear = manufacturYear;

        }

        public string Model { get; set; }
        public string Brand { get; set; }
        public int ManufacturYear { get; set; }
    }
}
