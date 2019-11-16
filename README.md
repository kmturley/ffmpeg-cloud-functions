# ffmpeg-cloud-functions

Example video encoder running on Google Cloud Functions:

* Google Cloud Storage 4.1.x
* Ffmpeg Static 2.7.x
* Fluent Ffmpeg 2.1.x


## Installation

Install dependencies using:

    npm install


## Usage

Run an example locally using:

    npm start


## Deployment

Deploy to Google Cloud Functions using:

    npm run deploy


## Cloud Functions limitations

With a max function duration of 540 seconds, you can only process videos shorter than 9 minutes.

Resource Limits:

    100MB - Max deployment size (500MB plus modules)
    10MB - Max uncompressed HTTP request size
    10MB - Max uncompressed HTTP response size
    10MB - Max event size for background functions
    2048MB - Max function memory

Time Limits

    540 seconds - Max function duration
    120 minutes - Max build time

Rate Limits

    100,000,000 per 100 seconds - Function invocations per second
    100,000 GHz-seconds per 100 seconds - GHz-seconds
    10,000,000 GHz-seconds per day - Daily GHz-seconds
    5000 per 100 seconds - API calls (READ)
    80 per 100 seconds - API calls (WRITE)
    16 per 100 seconds - API calls (CALL)
    10 GB per 100 seconds - Outbound Socket Data

## Directory structure

    /index.js                            --> Cloud Function
    /local.js                            --> Local example
    /videos                              --> Example videos


## Contact

For more information please contact kmturley
