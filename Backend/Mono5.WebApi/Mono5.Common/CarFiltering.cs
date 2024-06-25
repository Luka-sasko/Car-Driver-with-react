using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;

namespace Mono5.Common
{
    public class CarFiltering
    {
        public CarFiltering() { }
        public string SearchQuery { get; set; }
        public string Model { get; set; }
        public string Brand { get; set; }
        public int ManufacturYear { get; set; }

    }
}
