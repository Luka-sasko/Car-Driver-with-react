using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mono5.Model
{
    public class DriverUpdate
    {
        public DriverUpdate() { }
        public DriverUpdate(string firstName, string lastName, string contact)
        {
            FirstName = firstName;
            LastName = lastName;
            Contact = contact;
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Contact { get; set; }
    }
}
