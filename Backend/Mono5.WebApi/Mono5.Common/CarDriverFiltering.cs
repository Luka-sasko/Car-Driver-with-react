using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mono5.Common
{
    public class CarDriverFiltering
    {
        public CarDriverFiltering() { }

        public string DriverFirstName { get; set; }

        public string DriverLastName { get; set; }
        public string Model  {get; set;}
        public string Brand { get; set; }
        public int ManufacturYear { get; set; }
    }
}
