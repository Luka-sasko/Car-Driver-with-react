using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mono5.Model
{
    public class CarDriverUpdate
    {
        public CarDriverUpdate() { }
        public CarDriverUpdate(int driverId)
        {
            DriverId = driverId;
        }

        public int DriverId { get; set; }
    }
}
