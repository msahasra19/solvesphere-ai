# Deployment Guide for SolveSphere AI

This guide covers deploying SolveSphere AI to production environments.

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended for Next.js)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Deploy to Vercel**
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Configure environment variables
- Deploy!

3. **Environment Variables on Vercel**
```
MONGODB_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_API_URL=https://your-domain.vercel.app/api
```

### Option 2: Docker Deployment

1. **Create Dockerfile**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

2. **Create docker-compose.yml**
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/solvesphere-ai
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - mongo

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

3. **Deploy**
```bash
docker-compose up -d
```

### Option 3: AWS Deployment

#### Using AWS Amplify

1. **Install AWS Amplify CLI**
```bash
npm install -g @aws-amplify/cli
amplify configure
```

2. **Initialize Amplify**
```bash
amplify init
amplify add hosting
amplify publish
```

#### Using AWS EC2

1. **Launch EC2 Instance**
- Choose Ubuntu Server 22.04 LTS
- Configure security groups (ports 80, 443, 22)

2. **SSH into Instance**
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

3. **Install Dependencies**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod

# Install PM2
sudo npm install -g pm2
```

4. **Deploy Application**
```bash
# Clone repository
git clone <your-repo-url>
cd solvesphere-ai

# Install dependencies
npm install

# Build application
npm run build

# Start with PM2
pm2 start npm --name "solvesphere-ai" -- start
pm2 save
pm2 startup
```

5. **Configure Nginx**
```bash
sudo apt install -y nginx

# Create Nginx config
sudo nano /etc/nginx/sites-available/solvesphere-ai
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/solvesphere-ai /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

6. **Setup SSL with Let's Encrypt**
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### Option 4: DigitalOcean App Platform

1. **Create App**
- Go to DigitalOcean App Platform
- Connect your GitHub repository
- Configure build settings

2. **Environment Variables**
Add all required environment variables in the App Platform dashboard

3. **Deploy**
Click "Deploy" and your app will be live!

## 🗄️ Database Setup

### MongoDB Atlas (Recommended)

1. **Create Account**
- Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Create a free cluster

2. **Configure Network Access**
- Add your IP address or allow access from anywhere (0.0.0.0/0)

3. **Create Database User**
- Create a user with read/write permissions

4. **Get Connection String**
```
mongodb+srv://username:password@cluster.mongodb.net/solvesphere-ai?retryWrites=true&w=majority
```

### Self-Hosted MongoDB

1. **Install MongoDB**
```bash
# Ubuntu/Debian
sudo apt install -y mongodb

# Start service
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

2. **Configure MongoDB**
```bash
sudo nano /etc/mongodb.conf
```

3. **Create Database and User**
```bash
mongosh
use solvesphere-ai
db.createUser({
  user: "admin",
  pwd: "secure_password",
  roles: ["readWrite"]
})
```

## 🔐 Security Checklist

- [ ] Use strong JWT secret (minimum 32 characters)
- [ ] Enable HTTPS/SSL
- [ ] Set secure CORS policies
- [ ] Use environment variables for secrets
- [ ] Enable MongoDB authentication
- [ ] Set up firewall rules
- [ ] Regular security updates
- [ ] Rate limiting on API endpoints
- [ ] Input validation and sanitization
- [ ] Implement CSRF protection

## 📊 Monitoring & Analytics

### Setup Application Monitoring

1. **Install Monitoring Tools**
```bash
npm install @vercel/analytics
```

2. **Add to Layout**
```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Error Tracking with Sentry

1. **Install Sentry**
```bash
npm install @sentry/nextjs
```

2. **Initialize Sentry**
```bash
npx @sentry/wizard@latest -i nextjs
```

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🎯 Performance Optimization

### Enable Caching

1. **Next.js Image Optimization**
```tsx
import Image from 'next/image';

<Image
  src="/image.jpg"
  width={500}
  height={300}
  alt="Description"
/>
```

2. **API Route Caching**
```tsx
export const revalidate = 3600; // Revalidate every hour
```

### CDN Configuration

- Use Vercel's Edge Network (automatic)
- Or configure CloudFlare for custom domains

## 📈 Scaling Strategies

### Horizontal Scaling

1. **Load Balancer Setup**
- Use AWS ELB or Nginx load balancer
- Configure multiple app instances

2. **Database Replication**
- Set up MongoDB replica sets
- Configure read replicas

### Vertical Scaling

- Upgrade server resources
- Optimize database queries
- Implement caching (Redis)

## 🔧 Maintenance

### Regular Tasks

1. **Update Dependencies**
```bash
npm update
npm audit fix
```

2. **Database Backups**
```bash
mongodump --uri="mongodb://localhost:27017/solvesphere-ai" --out=/backup
```

3. **Monitor Logs**
```bash
pm2 logs solvesphere-ai
```

4. **Performance Monitoring**
- Check response times
- Monitor error rates
- Track user metrics

## 🆘 Troubleshooting

### Common Issues

**Build Fails**
```bash
# Clear cache
rm -rf .next
npm run build
```

**Database Connection Issues**
- Check MongoDB is running
- Verify connection string
- Check network access rules

**Environment Variables Not Loading**
- Restart the application
- Verify .env file location
- Check variable names

## 📞 Support

For deployment issues:
- Check documentation
- Open GitHub issue
- Contact support team

---

Happy Deploying! 🚀