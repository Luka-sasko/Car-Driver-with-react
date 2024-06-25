using Mono5.Common;
using Mono5.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mono5.Service.Common
{
    public interface IDriverService
    {
        Task<Driver> GetDriverById(int id);
        Task<IEnumerable<Driver>> GetDrivers(Paging paging, Sorting sorting, DriverFiltering driverFilter);
        Task<Driver> AddDriver(Driver driver);
        Task<Driver> UpdateDriver(int id, DriverUpdate editedDriver);
        Task<Driver> DeleteDriver(int id);
    }
}
