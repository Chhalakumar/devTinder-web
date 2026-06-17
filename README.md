#routes

navbar
Route = / => feed
Route = /login =>login
Route = /connections =>Connections
Route = /profile =>Profile

#deployment:
-Launch instance
-chomd 400 <secret>.pem
ssh -i .\devTinder.pem ubuntu@44.212.47.8
-ssh -i "devTinder.pem" ubuntu@ec2-44-204-206-149.compute-1.amazonaws.com
-Install node verdion 16.17.0
-git clone 
#frontend:
    ->npm install ->dependencies 
    ->npm run build 
    ->sudo apt install nginx 
    ->sudo systemctl start nginx 
    ->sudo systemctl enable nginx 
    ->copy code from dist(build files) is /var/www/html
    ->sudo scp -r dist/* /var/www/html/
    ->enable port :80 of your instance 

#backend:
    ->updated db password
    ->allowed ec2 instance public ip on mongodb server 
    ->npm install pm2 -g
    ->pm2 start npm -- start //pm2 start npm --name "devTinder-backend" -- start
    ->pm2 list ,pm2 flush <name>,pm2 stop <namae>,pm2 delete <name>
    sudo nano /etc/nginx/sites-available/default

    <!-- ************************************************************************** -->
    ssh ubuntu@server
cd backend
git pull
npm install
pm2 restart all

cd frontend
git pull
npm install
npm run build
sudo cp -r dist/* /var/www/html/
sudo systemctl reload nginx




#sending Email via SES

-creaate a IAM user
-gie access to amazonsesFullAccess
-Amazon SES:create an Identitiy
-verify  your domain name 
-verify an email address

#scheduling cron jobs i nodJS
 -Installing node-cron
 -learning about crin expressions syntax - crontab.guru
 -scheduling a job 
 -date-fns
 -find all the unique email ID who get conneciton request in preview dat 
 -send email 
 -explore queue mechanism to send bulk emails
 -Amazon ses bulk emails
 -make sendEmail funtion dynamic 
 -bee-queue & bull npm packages