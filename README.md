# Weather App

This is a simple weather app.

## Setup

1. Clone the repository.
2. Run `npm install` to install the dependencies.
3. Create a `.env` file in the root of your project. This file will hold your environment variables, such as API keys. Here's an example of what your `.env` file might look like:

    ```
    API_KEY=your_api_key_here
    ```

    Replace `your_api_key_here` with your actual API key. 

4. Run `node app.js` to start the server.
5. Navigate to `http://localhost:3000/weather` in your web browser to see the weather data.

Please note that the `.env` file and the `fontawesome-free-6.5.1-web/` directory are included in the `.gitignore` file, so they won't be tracked by Git. This is to prevent your API keys and other sensitive information from being exposed publicly.

## Using Font Awesome Icons

This project uses Font Awesome icons. The icons are already included in the project files under `public/fontawesome-free-6.5.1-web/`. To use an icon in your HTML, you can use an `<i>` tag with the appropriate classes. For example, to use the cloud icon, you would use `<i class="fas fa-cloud"></i>`.
