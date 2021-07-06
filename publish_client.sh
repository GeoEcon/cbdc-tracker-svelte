cp -r ~/higsch/projects/ac-geo-cbdctracker/cbdc-tracker/src/* ~/higsch/projects/ac-geo-cbdctracker/cbdc-tracker-public/src
cp -r ~/higsch/projects/ac-geo-cbdctracker/cbdc-tracker/public/* ~/higsch/projects/ac-geo-cbdctracker/cbdc-tracker-public/public/
cp -r ~/higsch/projects/ac-geo-cbdctracker/cbdc-tracker/package.json ~/higsch/projects/ac-geo-cbdctracker/cbdc-tracker-public/
cd ~/higsch/projects/ac-geo-cbdctracker/cbdc-tracker-public
npm install
npm run build
cd public
git add .
git commit -m "build"
git push origin main
