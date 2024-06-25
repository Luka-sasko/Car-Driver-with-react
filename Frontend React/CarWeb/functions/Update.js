document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const updateIndex = params.get("index");

    if (updateIndex !== null) 
    {
        const storedCars = JSON.parse(localStorage.getItem("cars"));
        if (storedCars !== null && updateIndex >= 0 && updateIndex < storedCars.length) 
        {
            const carToUpdate = storedCars[updateIndex];
            console.log(carToUpdate);
            document.getElementById("brandUpdate").value = carToUpdate.Brand;
            document.getElementById("modelUpdate").value = carToUpdate.Model;
            document.getElementById("manufactureYearUpdate").value = carToUpdate.ManufacturYear;
        } else 
        {
            console.error("Invalid index or stored cars array is null");
        }
    } 
    else 
    {
        console.error("Invalid index");
    }
});

function UpdateCar() 
{
    const params = new URLSearchParams(window.location.search);
    const updateIndex = params.get("index");
    let storedCars = JSON.parse(localStorage.getItem("cars"));

    if (updateIndex !== null && storedCars !== null) 
    {
        if (updateIndex >= 0 && updateIndex < storedCars.length) 
        {
            let updatedBrand = document.getElementById("brandUpdate").value;
            let updatedModel = document.getElementById("modelUpdate").value;
            let updatedManufactureYear = document.getElementById("manufactureYearUpdate").value;

            storedCars[updateIndex].Brand = updatedBrand;
            storedCars[updateIndex].Model = updatedModel;
            storedCars[updateIndex].ManufacturYear = updatedManufactureYear;

            localStorage.setItem("cars", JSON.stringify(storedCars));
            alert(`Successfully updated car\t ${updateIndex + 1}: \n\n${JSON.stringify(storedCars[updateIndex])}`);
        } else {
            console.error("Invalid index");
        }
    } else {
        console.error("Invalid index or stored cars array is null");
    }
}

