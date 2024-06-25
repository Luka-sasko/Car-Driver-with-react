using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;

namespace Mono5.Model
{
    public class CarDriver
    {
        public int CarId { get; set; }
        public int DriverId { get; set; }
        public CarDriver Driver { get; set; }
        public string DriverFirstName { get; set; }
        public string DriverLastName { get; set; }
        public string CarModel { get; set; }
        public string CarBrand { get; set; }
        public int CarManufacturYear { get; set; }
    }
}
