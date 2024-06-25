using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Mono5.Common;
using Mono5.Model;
using Mono5.Service.Common;

namespace Mono5.WebApi.Controllers
{
    [RoutePrefix("api/cardriver")]
    public class CarDriverController : ApiController
    {
        private readonly ICarDriverService CarDriverService;

        public CarDriverController(ICarDriverService carDriverService)
        {
            CarDriverService = carDriverService;

        }
        
        [HttpGet]
        public async Task<HttpResponseMessage> GetCarDriver(
             int PageNumber = 1,
             int PageSize = 10,
             string SortBy = "",
             bool? isAsc = null,
             string driverFirstName = "",
             string driverLastName = "",
             string model = null,
             string brand = null,
             int? manufacturYear = null
            ) {
            try {
                Paging paging = new Paging { PageNumber = PageNumber, PageSize = PageSize };
                Sorting sorting = new Sorting { SortBy = SortBy, IsAsc = isAsc };
                CarDriverFiltering carDriverFilter = new CarDriverFiltering { DriverFirstName = driverFirstName, DriverLastName = driverLastName, Model=model, ManufacturYear = manufacturYear.GetValueOrDefault(), Brand=brand};
                var carDrivers = await CarDriverService.GetCarDrivers(paging,sorting,carDriverFilter);
                if (carDrivers == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, "Car was not found!");
                }
                return Request.CreateResponse(HttpStatusCode.OK, carDrivers);
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
        
        // POST api/cardriver/{carId}/driver/{driverId}
        [HttpPost]
        [Route("{carId}/driver/{driverId}")]
        public async Task<HttpResponseMessage> AddCarDriver(int carId, int driverId)
        {
            try
            {
                await CarDriverService.AddCarDriver(carId, driverId);
                return Request.CreateResponse(HttpStatusCode.Created, "Car driver added successfully");
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

        // DELETE api/cardriver/{carId}/driver/{driverId}
        [HttpDelete]
        [Route("{carId}/driver/{driverId}")]
        public async Task<HttpResponseMessage> DeleteCarDriver(int carId, int driverId)
        {
            try
            {
                await CarDriverService.DeleteCarDriver(driverId, carId);
                return Request.CreateResponse(HttpStatusCode.OK, "Car driver deleted successfully");
            }
            catch (KeyNotFoundException)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, "Car driver not found");
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        // PUT api/cardriver/{carId}/driver/{driverId}
        [HttpPut]
        [Route("api/cardriver/{carId}/driver/{driverId}")]
        public async Task<HttpResponseMessage> UpdateCarDriver(int carId, int driverId, [FromBody] CarDriverUpdate carDriverUpdate)
        {
            try
            {
                await CarDriverService.UpdateCarDriver(carId, driverId, carDriverUpdate.DriverId);
                return Request.CreateResponse(HttpStatusCode.OK, "Car driver updated successfully");
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
    }
}
