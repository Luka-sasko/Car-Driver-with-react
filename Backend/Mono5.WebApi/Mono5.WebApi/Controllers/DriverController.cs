using System;
using System.Collections.Generic;
using System.Drawing.Drawing2D;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Mono5.Common;
using Mono5.Model;
using Mono5.Service.Common;

namespace Mono5.WebApi.Controllers
{
    public class DriverController : ApiController
    {
        private readonly IDriverService DriverService;

        public DriverController(IDriverService driverService)
        {
            DriverService = driverService;
        }

        public async Task<HttpResponseMessage> Get(
            int pageNumber = 1,
            int pageSize = 10,
            string sortBy = "",
            bool isAsc = true,
            string searchQuery = null,
            string firstName = null,
            string lastName = null,
            string contact=null)
        {
            try
            {
                Paging paging = new Paging { PageNumber = pageNumber, PageSize = pageSize };
                Sorting sorting = new Sorting { SortBy = sortBy, IsAsc = isAsc };
                DriverFiltering driverFiltering = new DriverFiltering { SearchQuery = searchQuery, FirstName = firstName, LastName = lastName, Contact = contact };
                var drivers = await DriverService.GetDrivers(paging,sorting,driverFiltering);
                if (drivers == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, "Drivers was not found!");
                }
                return Request.CreateResponse(HttpStatusCode.OK, drivers);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        public async Task<HttpResponseMessage> Post([FromBody] Driver newDriver)
        {
            try
            {
                await DriverService.AddDriver(newDriver);
                return Request.CreateResponse(HttpStatusCode.Created, newDriver);
            }
            catch (ArgumentException ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        public async Task<HttpResponseMessage> Put(int id, [FromBody] DriverUpdate editedDriver)
        {
            try
            {
                await DriverService.UpdateDriver(id, editedDriver);
                var driver =await DriverService.GetDriverById(id);
                return Request.CreateResponse(HttpStatusCode.OK,driver);
            }
            catch (ArgumentException ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        public async Task<HttpResponseMessage> Delete(int id)
        {
            try
            {
                var driver = await DriverService.GetDriverById(id);
                await DriverService.DeleteDriver(id);
                return Request.CreateResponse(HttpStatusCode.OK,driver);
            }
            catch (KeyNotFoundException)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}
