function LocationForm({ handlerSubmitLocation }) {

    //Handler function for when the user submits the form
    const handlerSubmitForm = (event) => {
        event.preventDefault(); //Prevent event from refreshing the page after submitting the form

        const city = event.target.city.value; //Get the `city` value from the input field
        const state = event.target.state.value; //Get the `state` value from the input field

        //Save city and state inside an object called `locationData`
        const locationData = {
            city: city,
            state: state
        }

        //Using the passed prop function `handlerSubmitLocation`, send up our locationData object back to App.js
        handlerSubmitLocation(locationData);        
    }

    return (
        <>
            <form onSubmit={handlerSubmitForm}>
                <label>City</label>
                <input type="text" name="city" id="city"/>

                <label>State</label>
                <input type="text" name="state" id="state"/>

                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default LocationForm;