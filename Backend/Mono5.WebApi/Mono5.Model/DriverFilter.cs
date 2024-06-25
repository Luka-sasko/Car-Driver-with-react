using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mono5.Model
{
    public class DriverFilter
    {
        public DriverFilter() { }
        public DriverFilter(int id,string firstName,string lastName,string Contact) { }
        public int Id {  get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Contact { get; set; }
    }
}
