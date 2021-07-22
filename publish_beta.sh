cp -r ~/higsch/projects/ac-geo-cbdctracker/cbdc-tracker/src/* ~/higsch/projects/ac-geo-cbdctracker/cbdc-tracker-beta/src
cp -r ~/higsch/projects/ac-geo-cbdctracker/cbdc-tracker/public/* ~/higsch/projects/ac-geo-cbdctracker/cbdc-tracker-beta/public/
cp -r ~/higsch/projects/ac-geo-cbdctracker/cbdc-tracker/package.json ~/higsch/projects/ac-geo-cbdctracker/cbdc-tracker-beta/
cd ~/higsch/projects/ac-geo-cbdctracker/cbdc-tracker-beta
npm install
npm run build
cd public
git add .
git commit -m "build"
git push origin main
