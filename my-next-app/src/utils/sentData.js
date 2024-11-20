export const sendDataToBackend = async (data) => {
    try {
        if (Object.keys(data).length > 0) {
            const response = await fetch('http://localhost:8080/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: data }),
            });
            const responseData = await response.json();
            console.log('Success:', responseData);
        } else {
            console.log('No data in localStorage');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
