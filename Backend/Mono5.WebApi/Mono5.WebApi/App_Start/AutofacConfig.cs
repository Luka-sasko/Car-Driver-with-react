using System.Reflection;
using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;
using Mono5.Repository;
using Mono5.Repository.Common;
using Mono5.Service;
using Mono5.Service.Common;

public class AutofacConfig
{
    public static void Configure(HttpConfiguration config)
    {
        var builder = new ContainerBuilder();

        builder.RegisterType<CarService>().As<ICarService>();
        builder.RegisterType<CarRepository>().As<ICarRepository>();

        builder.RegisterType<DriverService>().As<IDriverService>();
        builder.RegisterType<DriverRepository>().As<IDriverRepository>();

        builder.RegisterType<CarDriverRepository>().As<ICarDriverRepository>();
        builder.RegisterType<CarDriverService>().As<ICarDriverService>();


        builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

        var container = builder.Build();

        config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
    }
}
