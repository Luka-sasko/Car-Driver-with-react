using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mono5.Model
{
    public class Driver
    {
        public Driver() { }
        public Driver(int id,string firstName, string lastName, string contact)
        {
            Id = id;
            FirstName = firstName;
            LastName = lastName;
            Contact = contact;
        }
        public int Id { get; set; } 
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Contact { get; set; }
        public List<Driver> CarDrivers { get; set; }
    }
}
