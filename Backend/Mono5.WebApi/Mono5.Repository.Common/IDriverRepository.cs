using Mono5.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mono5.Common;
namespace Mono5.Repository.Common
{
    public interface IDriverRepository
    {
        
        Task<IEnumerable<Driver>> GetDrivers(Paging paging,Sorting sorting,DriverFiltering driverFiltreing);
        Task<Driver> FindDriverById(int id);
        Task<Driver> DeleteDriver(int id);
        Task<Driver> UpdateDriver(int id, DriverUpdate updatedDriver);
        Task<Driver> AddDriver(Driver driver);
    }
}
