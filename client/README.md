## Kidsloops Bandanamu Web site

Get started

1. yarn install
2. yarn dev

utils
gcloud run services describe kidsloop --format export > service.yaml
gcloud run deploy [SERVICE] --image IMAGE_URL --update-env-vars KEY1=VALUE1,KEY2=VALUE2

deploy

if m1 chip

1. docker build --platform linux/amd64 . -t kidsloop:latest  
   else
1. docker build . -t kidsloop:latest
1. docker run -e PORT=8080 -p 3000:8080 kidsloop:latest
1. docker tag kidsloop gcr.io/temporal-storm-342107/kidsloop:latest
1. docker push gcr.io/temporal-storm-342107/kidsloop:latest
1. gcloud beta run deploy --image gcr.io/temporal-storm-342107/kidsloop:latest --project temporal-storm-342107 --platform managed --region asia-southeast2 --allow-unauthenticated

## Deploy to Google Cloud Run

[![Run on Google Cloud](https://deploy.cloud.run/button.svg)](https://deploy.cloud.run)