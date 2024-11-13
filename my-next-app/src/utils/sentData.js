export const sendDataToBackend = async (data) => {
    try {
        if (Object.keys(data).length > 0) {
            fetch('http://localhost:8080/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: data }),
            })
            .then(response => response.json())
            .then(responseData => console.log('Success:', responseData))
            .catch((error) => console.error('Error:', error));
        } else {
            console.log('No data in localStorage');
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
