document.addEventListener("DOMContentLoaded", function()
{
    if (localStorage.getItem("cars")) {
        cars = JSON.parse(localStorage.getItem("cars"));
    }
    ShowAllCars(); 
});

function ShowAllCars() 
{
    const carsShowList = document.getElementById("carList");
    carsShowList.innerHTML = ''; 
    let ul = document.createElement("ul");

    cars.forEach(function (car, index) 
    { 
        let li = document.createElement("li");
        let deleteButton = document.createElement("button");
        let updateButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function() {DeleteCar(index);});
        updateButton.textContent = "Update";
        updateButton.addEventListener("click", function() {UpdateCar(index);});

        let manufactureYear = car.ManufacturYear;

        li.textContent = `${car.Brand} ${car.Model} (${manufactureYear})`;
        li.appendChild(deleteButton);
        li.appendChild(updateButton);
        ul.appendChild(li);
    });
    carsShowList.appendChild(ul);
}

function HideAllCars() 
{
    const carsShowList = document.getElementById("carList");
    carsShowList.innerHTML = '';
}

function AddCar() 
{
    let id = document.getElementById("id".value);
    let model = document.getElementById("model").value;
    let brand = document.getElementById("brand").value;
    let manufactureYear = document.getElementById("manufactureYear").value;

    if (brand === "" || model === "" || !(manufactureYear >= 1900 && manufactureYear <= 2024)) 
    {
        alert("Please fill out all fields correctly.");
        return;
    }

    let newCar = 
    {
        "Id" : id,
        "Brand": brand,
        "Model": model,
        "ManufacturYear": manufactureYear
    };
    cars.push(newCar);
    localStorage.setItem("cars", JSON.stringify(cars));
    ShowAllCars();
}

function UpdateCar(index) 
{
    let url = "Update.html";
    url += "?index=" + encodeURIComponent(index);
    window.location.href = url;
}

function DeleteCar(index) 
{
    cars.splice(index, 1);
    localStorage.setItem("cars", JSON.stringify(cars));
    ShowAllCars();
}
