// --- 1. Loader Logic ---
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loader').classList.add('hidden');
            }, 600); // Penundaan sedikit agar transisi lebih smooth
        });

        // --- 2. Particles Background Animation ---
        const canvas = document.getElementById('particles-canvas');
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        function initParticles() {
            particles = [];
            let particleCount = window.innerWidth < 768 ? 40 : 80;
            for(let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    s: Math.random() * 2 + 0.5,
                    v: Math.random() * 0.5 + 0.2
                });
            }
        }
        initParticles();

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
            
            particles.forEach(p => {
                // Bergerak pelan ke atas
                p.y -= p.v;
                if(p.y < 0) {
                    p.y = canvas.height;
                    p.x = Math.random() * canvas.width;
                }
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
                ctx.fill();
            });
            requestAnimationFrame(animateParticles);
        }
        animateParticles();

        // --- 3. Umur (Age) Calculator ---
        function calculateAge(birthDateString) {
            const birthDate = new Date(birthDateString);
            const now = new Date();
            
            let years = now.getFullYear() - birthDate.getFullYear();
            let months = now.getMonth() - birthDate.getMonth();
            let days = now.getDate() - birthDate.getDate();
            
            if (days < 0) {
                months--;
                // Ambil jumlah hari di bulan sebelumnya
                const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
                days += lastMonth.getDate();
            }
            if (months < 0) {
                years--;
                months += 12;
            }
            
            // Format agar rapih (jika hari 0, sembunyikan)
            let result = `${years} Tahun ${months} Bulan`;
            if (days > 0) result += ` ${days} Hari`;
            
            return result;
        }

        
function calculateDaysSince(dateString){
 const start=new Date(dateString),today=new Date();
 start.setHours(0,0,0,0);today.setHours(0,0,0,0);
 return Math.floor((today-start)/86400000);
}
document.addEventListener('DOMContentLoaded',()=>{
 document.querySelectorAll('.umur-value').forEach(el=>{
   const b=el.dataset.birth;
   if(b) el.textContent=calculateAge(b);
 });
 document.querySelectorAll('.hari-value').forEach(el=>{
   const s=el.dataset.since;
   if(s) el.textContent=calculateDaysSince(s).toLocaleString('id-ID')+' Hari';
 });
});



        // Data Album Utama
        const galleryData = [
            { "id": 1, "category": "Bersama", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-1.jpg", "title": "Album 1" },
            { "id": 2, "category": "Bersama", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-2.jpg", "title": "Album 2" },
            { "id": 3, "category": "Bersama", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-3.jpg", "title": "Album 3" },
            { "id": 4, "category": "Bersama", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-4.jpg", "title": "Album 4" },
            { "id": 5, "category": "Bersama", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-5.jpg", "title": "Album 5" },
            { "id": 6, "category": "Bersama", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-6.jpg", "title": "Album 6" },
            { "id": 7, "category": "Bersama", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-7.jpg", "title": "Album 7" },
            { "id": 8, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-8.jpg", "title": "Album 8" },
            { "id": 9, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-9.jpg", "title": "Album 9" },
            { "id": 10, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-10.jpg", "title": "Album 10" },
            { "id": 11, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-11.jpg", "title": "Album 11" },
            { "id": 12, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-12.jpg", "title": "Album 12" },
            { "id": 13, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-13.jpg", "title": "Album 13" },
            { "id": 14, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-14.jpg", "title": "Album 14" },
            { "id": 15, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-15.jpg", "title": "Album 15" },
            { "id": 16, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-16.jpg", "title": "Album 16" },
            { "id": 17, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-17.jpg", "title": "Album 17" },
            { "id": 18, "category": "Dika", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-18.jpg", "title": "Album 18" },
            { "id": 19, "category": "Dika", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-19.jpg", "title": "Album 19" },
            { "id": 20, "category": "Dika", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-20.jpg", "title": "Album 20" },
            { "id": 21, "category": "Dika", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-21.jpg", "title": "Album 21" },
            { "id": 22, "category": "Dika", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-22.jpg", "title": "Album 22" },
            { "id": 23, "category": "Dika", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-23.jpg", "title": "Album 23" },
            { "id": 24, "category": "Dika", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-24.jpg", "title": "Album 24" },
            { "id": 25, "category": "Dika", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-25.jpg", "title": "Album 25" },
            { "id": 26, "category": "Dika", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-26.jpg", "title": "Album 26" },
            { "id": 27, "category": "Dika", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-27.jpg", "title": "Album 27" },
            { "id": 28, "category": "Dika", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-28.jpg", "title": "Album 28" },
            { "id": 29, "category": "Dika", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-29.jpg", "title": "Album 29" },
            { "id": 30, "category": "Dika", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-30.jpg", "title": "Album 30" },
            { "id": 31, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-31.jpg", "title": "Album 31" },
            { "id": 32, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-32.jpg", "title": "Album 32" },
            { "id": 33, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-33.jpg", "title": "Album 33" },
            { "id": 34, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-34.jpg", "title": "Album 34" },
            { "id": 35, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-35.jpg", "title": "Album 35" },
            { "id": 36, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-36.jpg", "title": "Album 36" },
            { "id": 37, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-37.jpg", "title": "Album 37" },
            { "id": 38, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-38.jpg", "title": "Album 38" },
            { "id": 39, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-39.jpg", "title": "Album 39" },
            { "id": 40, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-40.jpg", "title": "Album 40" },
            { "id": 41, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-41.jpg", "title": "Album 41" },
            { "id": 42, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-42.jpg", "title": "Album 42" },
            { "id": 43, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-43.jpg", "title": "Album 43" },
            { "id": 44, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-44.jpg", "title": "Album 44" },
            { "id": 45, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-45.jpg", "title": "Album 45" },
            { "id": 46, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-46.jpg", "title": "Album 46" },
            { "id": 47, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-47.jpg", "title": "Album 47" },
            { "id": 48, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-48.jpg", "title": "Album 48" },
            { "id": 49, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-49.jpg", "title": "Album 49" },
            { "id": 50, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-50.jpg", "title": "Album 50" },
            { "id": 51, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-51.jpg", "title": "Album 51" },
            { "id": 52, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-52.jpg", "title": "Album 52" },
            { "id": 53, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-53.jpg", "title": "Album 53" },
            { "id": 54, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-54.jpg", "title": "Album 54" },
            { "id": 55, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-55.jpg", "title": "Album 55" },
            { "id": 56, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-56.jpg", "title": "Album 56" },
            { "id": 57, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-57.jpg", "title": "Album 57" },
            { "id": 58, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-58.jpg", "title": "Album 58" },
            { "id": 59, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-59.jpg", "title": "Album 59" },
            { "id": 60, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-60.jpg", "title": "Album 60" },
            { "id": 61, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-61.jpg", "title": "Album 61" },
            { "id": 62, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-62.jpg", "title": "Album 62" },
            { "id": 63, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-63.jpg", "title": "Album 63" },
            { "id": 64, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-64.jpg", "title": "Album 64" },
            { "id": 65, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-65.jpg", "title": "Album 65" },
            { "id": 66, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-66.jpg", "title": "Album 66" },
            { "id": 67, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-67.jpg", "title": "Album 67" },
            { "id": 68, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-68.jpg", "title": "Album 68" },
            { "id": 69, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-69.jpg", "title": "Album 69" },
            { "id": 70, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-70.jpg", "title": "Album 70" },
            { "id": 71, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-71.jpg", "title": "Album 71" },
            { "id": 72, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-72.jpg", "title": "Album 72" },
            { "id": 73, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-73.jpg", "title": "Album 73" },
            { "id": 74, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-74.jpg", "title": "Album 74" },
            { "id": 75, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-75.jpg", "title": "Album 75" },
            { "id": 76, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-76.jpg", "title": "Album 76" },
            { "id": 77, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-77.jpg", "title": "Album 77" },
            { "id": 78, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-78.jpg", "title": "Album 78" },
            { "id": 79, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-79.jpg", "title": "Album 79" },
            { "id": 80, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-80.jpg", "title": "Album 80" },
            { "id": 81, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-81.jpg", "title": "Album 81" },
            { "id": 82, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-82.jpg", "title": "Album 82" },
            { "id": 83, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-83.jpg", "title": "Album 83" },
            { "id": 84, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-84.jpg", "title": "Album 84" },
            { "id": 85, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-85.jpg", "title": "Album 85" },
            { "id": 86, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-86.jpg", "title": "Album 86" },
            { "id": 87, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-87.jpg", "title": "Album 87" },
            { "id": 88, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-88.jpg", "title": "Album 88" },
            { "id": 89, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-89.jpg", "title": "Album 89" },
            { "id": 90, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-90.jpg", "title": "Album 90" },
            { "id": 91, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-91.jpg", "title": "Album 91" },
            { "id": 92, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-92.jpg", "title": "Album 92" },
            { "id": 93, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-93.jpg", "title": "Album 93" },
            { "id": 94, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-94.jpg", "title": "Album 94" },
            { "id": 95, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-95.jpg", "title": "Album 95" },
            { "id": 96, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-96.jpg", "title": "Album 96" },
            { "id": 97, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-97.jpg", "title": "Album 97" },
            { "id": 98, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-98.jpg", "title": "Album 98" },
            { "id": 99, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-99.jpg", "title": "Album 99" },
            { "id": 100, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-100.jpg", "title": "Album 100" },
            { "id": 101, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-101.jpg", "title": "Album 101" },
            { "id": 102, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-102.jpg", "title": "Album 102" },
            { "id": 103, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-103.jpg", "title": "Album 103" },
            { "id": 104, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-104.jpg", "title": "Album 104" },
            { "id": 105, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-105.jpg", "title": "Album 105" },
            { "id": 106, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-106.jpg", "title": "Album 106" },
            { "id": 107, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-107.jpg", "title": "Album 107" },
            { "id": 108, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-108.jpg", "title": "Album 108" },
            { "id": 109, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-109.jpg", "title": "Album 109" },
            { "id": 110, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-110.jpg", "title": "Album 110" },
            { "id": 111, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-111.jpg", "title": "Album 111" },
            { "id": 112, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-112.jpg", "title": "Album 112" },
            { "id": 113, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-113.jpg", "title": "Album 113" },
            { "id": 114, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-114.jpg", "title": "Album 114" },
            { "id": 115, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-115.jpg", "title": "Album 115" },
            { "id": 116, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-116.jpg", "title": "Album 116" },
            { "id": 117, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-117.jpg", "title": "Album 117" },
            { "id": 118, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-118.jpg", "title": "Album 118" },
            { "id": 119, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-119.jpg", "title": "Album 119" },
            { "id": 120, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-120.jpg", "title": "Album 120" },
            { "id": 121, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-121.jpg", "title": "Album 121" },
            { "id": 122, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-122.jpg", "title": "Album 122" },
            { "id": 123, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-123.jpg", "title": "Album 123" },
            { "id": 124, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-124.jpg", "title": "Album 124" },
            { "id": 125, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-125.jpg", "title": "Album 125" },
            { "id": 126, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-126.jpg", "title": "Album 126" },
            { "id": 127, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-127.jpg", "title": "Album 127" },
            { "id": 128, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-128.jpg", "title": "Album 128" },
            { "id": 129, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-129.jpg", "title": "Album 129" },
            { "id": 130, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-130.jpg", "title": "Album 130" },
            { "id": 131, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-131.jpg", "title": "Album 131" },
            { "id": 132, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-132.jpg", "title": "Album 132" },
            { "id": 133, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-133.jpg", "title": "Album 133" },
            { "id": 134, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-134.jpg", "title": "Album 134" },
            { "id": 135, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-135.jpg", "title": "Album 135" },
            { "id": 136, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-136.jpg", "title": "Album 136" },
            { "id": 137, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-137.jpg", "title": "Album 137" },
            { "id": 138, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-138.jpg", "title": "Album 138" },
            { "id": 139, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-139.jpg", "title": "Album 139" },
            { "id": 140, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-140.jpg", "title": "Album 140" },
            { "id": 141, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-141.jpg", "title": "Album 141" },
            { "id": 142, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-142.jpg", "title": "Album 142" },
            { "id": 143, "category": "Dika", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-143.jpg", "title": "Album 143" },
            { "id": 144, "category": "Dika", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-144.jpg", "title": "Album 144" },
            { "id": 145, "category": "Saskia", "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/Album-145.jpg", "title": "Album 145" }
        ];

        // Data Album Photo
        const hiddenPhotoData = [
            { "id": 1, "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/HiddenAlbum-1.jpg" },
            { "id": 2, "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/HiddenAlbum-2.jpg" },
            { "id": 3, "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/HiddenAlbum-3.jpg" },
            { "id": 4, "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/HiddenAlbum-4.jpg" },
            { "id": 5, "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/HiddenAlbum-5.jpg" },
            { "id": 6, "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/HiddenAlbum-6.jpg" },
            { "id": 7, "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/HiddenAlbum-7.jpg" },
            { "id": 8, "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/HiddenAlbum-8.jpg" },
            { "id": 9, "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/HiddenAlbum-9.jpg" },
            { "id": 10, "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/HiddenAlbum-10.jpg" },
            { "id": 11, "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/HiddenAlbum-11.jpg" }
        ];

        // Data Album Posts & Reposts
        const hiddenPostsRepostsData = [
            { "id": 1, "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/HiddenAlbum2-1.jpg" },
            { "id": 2, "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/HiddenAlbum2-2.jpg" },
            { "id": 3, "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/HiddenAlbum2-3.jpg" },
            { "id": 4, "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/HiddenAlbum2-4.jpg" },
            { "id": 5, "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/HiddenAlbum2-5.jpg" },
            { "id": 6, "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/HiddenAlbum2-6.jpg" },
            { "id": 7, "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/HiddenAlbum2-7.jpg" },
            { "id": 8, "image": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Foto/HiddenAlbum2-8.jpg" }
        ];

        // Audio Data
        const audioData = [
            { "id": 1, "url": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Audio/Audio-1.mp3" },
            { "id": 2, "url": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Audio/Audio-2.mp3" },
            { "id": 3, "url": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Audio/Audio-3.mp3" },
            { "id": 4, "url": "https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Gallery/main/Audio/Audio-4.mp3" }
        ];

        document.addEventListener('DOMContentLoaded', () => {
            let filteredData = [...galleryData];
            let currentPhotoIndex = 0;

            // Navigation Elements
            const homeSection = document.getElementById('home-section');
            const profileSection = document.getElementById('profile-section');
            const hiddenSection = document.getElementById('hidden-section');
            const audioSection = document.getElementById('audio-section');
            const menuHome = document.getElementById('menu-home');
            const menuAlbum = document.getElementById('menu-album');
            const menuHidden = document.getElementById('menu-hidden');
            const menuAudio = document.getElementById('menu-audio');
            const menuProfile = document.getElementById('menu-profile');
            const sidebar = document.getElementById('sidebar');
            const sidebarOverlay = document.getElementById('sidebar-overlay');
            
            // Submenu Elements
            const hiddenSubmenu = document.getElementById('hidden-submenu');
            const menuHiddenWrapper = document.querySelector('.menu-hidden-wrapper');
            const submenuPhoto = document.getElementById('submenu-photo');
            const submenuPosts = document.getElementById('submenu-posts');
            const hiddenTitle = document.getElementById('hidden-title');
            const hiddenDesc = document.getElementById('hidden-desc');
            const hiddenGalleryContainer = document.getElementById('hidden-gallery-container');
            const postsContainer = document.getElementById('posts-container');

            // Switch Section Function
            function switchSection(section, subCategory = null) {
                homeSection.style.display = 'none';
                profileSection.style.display = 'none';
                hiddenSection.style.display = 'none';
                audioSection.style.display = 'none';
                menuHome.classList.remove('active');
                menuAlbum.classList.remove('active');
                menuHidden.classList.remove('active');
                menuAudio.classList.remove('active');
                menuProfile.classList.remove('active');
                
                // Reset Submenu active states
                submenuPhoto.classList.remove('active');
                submenuPosts.classList.remove('active');

                if (section === 'home') {
                    homeSection.style.display = 'block';
                    menuHome.classList.add('active');
                    hiddenSubmenu.classList.remove('active');
                    menuHiddenWrapper.classList.remove('active');
                    window.scrollTo(0, 0);
                    closeSidebarFunc();
                } else if (section === 'album') {
                    homeSection.style.display = 'block';
                    menuAlbum.classList.add('active');
                    hiddenSubmenu.classList.remove('active');
                    menuHiddenWrapper.classList.remove('active');
                    document.getElementById('album-section').scrollIntoView();
                    closeSidebarFunc();
                } else if (section === 'hidden') {
                    hiddenSection.style.display = 'block';
                    menuHidden.classList.add('active');
                    
                    // Keep submenu open
                    hiddenSubmenu.classList.add('active');
                    menuHiddenWrapper.classList.add('active');

                    if (subCategory === 'posts') {
                        submenuPosts.classList.add('active');
                        hiddenTitle.textContent = 'Posts & Reposts';
                        hiddenDesc.textContent = 'Koleksi postingan dan posting ulang.';
                        hiddenGalleryContainer.style.display = 'none';
                        postsContainer.style.display = 'grid';
                        renderPostsGallery();
                    } else {
                        submenuPhoto.classList.add('active');
                        hiddenTitle.textContent = 'Photo';
                        hiddenDesc.textContent = 'Koleksi momen-momen random.';
                        hiddenGalleryContainer.style.display = 'grid';
                        postsContainer.style.display = 'none';
                        renderHiddenGallery();
                    }
                    window.scrollTo(0, 0);
                    
                    // Tutup sidebar setelah memilih submenu
                    closeSidebarFunc();
                } else if (section === 'audio') {
                    audioSection.style.display = 'block';
                    menuAudio.classList.add('active');
                    hiddenSubmenu.classList.remove('active');
                    menuHiddenWrapper.classList.remove('active');
                    renderAudioGallery();
                    window.scrollTo(0, 0);
                    closeSidebarFunc();
                } else if (section === 'profile') {
                    profileSection.style.display = 'block';
                    menuProfile.classList.add('active');
                    hiddenSubmenu.classList.remove('active');
                    menuHiddenWrapper.classList.remove('active');
                    window.scrollTo(0, 0);
                    closeSidebarFunc();
                }
            }

            // Toggle Submenu Logic
            menuHidden.addEventListener('click', (e) => {
                e.preventDefault();
                const isSubmenuActive = hiddenSubmenu.classList.contains('active');
                
                if (isSubmenuActive && !menuHidden.classList.contains('active')) {
                    // If it's open but we are not in hidden section, just close it
                    hiddenSubmenu.classList.remove('active');
                    menuHiddenWrapper.classList.remove('active');
                } else if (!isSubmenuActive) {
                    // Open it
                    hiddenSubmenu.classList.add('active');
                    menuHiddenWrapper.classList.add('active');
                } else {
                    // If already in hidden section and submenu is open, toggle it
                    hiddenSubmenu.classList.toggle('active');
                    menuHiddenWrapper.classList.toggle('active');
                }
            });

            submenuPhoto.addEventListener('click', (e) => {
                e.preventDefault();
                switchSection('hidden', 'photo');
            });

            submenuPosts.addEventListener('click', (e) => {
                e.preventDefault();
                switchSection('hidden', 'posts');
            });

            menuHome.addEventListener('click', (e) => { e.preventDefault(); switchSection('home'); });
            menuAlbum.addEventListener('click', (e) => { e.preventDefault(); switchSection('album'); });
            menuAudio.addEventListener('click', (e) => { e.preventDefault(); switchSection('audio'); });
            menuProfile.addEventListener('click', (e) => { e.preventDefault(); switchSection('profile'); });
            document.getElementById('hero-btn-album').addEventListener('click', (e) => { e.preventDefault(); switchSection('album'); });
            document.getElementById('hero-btn-all').addEventListener('click', (e) => { e.preventDefault(); switchSection('album'); });

            // Existing Gallery Logic
            const loadingScreen = document.getElementById('loading-screen');
            const header = document.getElementById('main-header');
            const mobileMenu = document.getElementById('mobile-menu');
            const closeSidebar = document.getElementById('close-sidebar');
            const galleryContainer = document.getElementById('gallery-container');
            const searchInput = document.getElementById('search-input');
            const filterBtns = document.querySelectorAll('.filter-btn');
            const photoCountSpan = document.getElementById('photo-count');
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            const closeLightbox = document.querySelector('.close-lightbox');
            const prevBtn = document.getElementById('prev-btn');
            const nextBtn = document.getElementById('next-btn');

            window.addEventListener('load', () => {
                setTimeout(() => {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => loadingScreen.style.display = 'none', 500);
                    startCounters();
                    revealOnScroll();
                }, 1500);
            });

            function renderGallery(data) {
                galleryContainer.innerHTML = '';
                photoCountSpan.textContent = data.length;
                if (data.length === 0) {
                    galleryContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 50px;">Tidak ada foto ditemukan.</p>';
                    return;
                }
                data.forEach((photo, index) => {
                    const card = document.createElement('div');
                    card.className = 'photo-card scroll-reveal';
                    // Tambahkan badge kategori hanya untuk Album utama
                    card.innerHTML = `
                        <div class="photo-img-wrapper">
                            <span class="badge-mini">${photo.category}</span>
                            <img src="${photo.image}" alt="Photo" loading="lazy">
                        </div>`;
                    card.addEventListener('click', () => {
                        filteredData = data;
                        openLightbox(index);
                    });
                    galleryContainer.appendChild(card);
                });
                setTimeout(revealOnScroll, 100);
            }

            function renderHiddenGallery() {
                const hiddenGalleryContainer = document.getElementById('hidden-gallery-container');
                hiddenGalleryContainer.innerHTML = '';
                
                if (hiddenPhotoData.length === 0) {
                    hiddenGalleryContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 50px;">Tidak ada foto di Hidden Album.</p>';
                    return;
                }

                hiddenPhotoData.forEach((photo, index) => {
                    const card = document.createElement('div');
                    card.className = 'photo-card scroll-reveal';
                    card.innerHTML = `<div class="photo-img-wrapper"><img src="${photo.image}" alt="Photo" loading="lazy"></div>`;
                    card.addEventListener('click', () => {
                        filteredData = hiddenPhotoData;
                        openLightbox(index);
                    });
                    hiddenGalleryContainer.appendChild(card);
                });
                setTimeout(revealOnScroll, 100);
            }

            function renderPostsGallery() {
                const postsContainer = document.getElementById('posts-container');
                postsContainer.innerHTML = '';
                
                if (hiddenPostsRepostsData.length === 0) {
                    postsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 50px; color: var(--text-gray);">Belum ada postingan atau repost untuk ditampilkan.</p>';
                    return;
                }

                hiddenPostsRepostsData.forEach((post, index) => {
                    const card = document.createElement('div');
                    card.className = 'photo-card scroll-reveal';
                    card.innerHTML = `<div class="photo-img-wrapper"><img src="${post.image}" alt="Post" loading="lazy"></div>`;
                    card.addEventListener('click', () => {
                        filteredData = hiddenPostsRepostsData;
                        openLightbox(index);
                    });
                    postsContainer.appendChild(card);
                });
                setTimeout(revealOnScroll, 100);
            }

            searchInput.addEventListener('input', (e) => {
                const term = e.target.value.toLowerCase();
                filterData(term, document.querySelector('.filter-btn.active').dataset.filter);
            });

            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    filterData(searchInput.value.toLowerCase(), btn.dataset.filter);
                });
            });

            function filterData(searchTerm, category) {
                filteredData = galleryData.filter(item => {
                    const matchesSearch = item.category.toLowerCase().includes(searchTerm) || item.title.toLowerCase().includes(searchTerm);
                    const matchesCategory = category === 'Semua' || item.category === category;
                    return matchesSearch && matchesCategory;
                });
                renderGallery(filteredData);
            }

            let slideDirection = 'right';
            let isLightboxOpen = false;
            
            function openLightbox(index, isNavigation = false) {
                currentPhotoIndex = index;
                
                // Hapus semua class animasi sebelumnya
                lightboxImg.classList.remove('fade-in', 'slide-left', 'slide-right');
                
                // Trigger reflow untuk reset animasi
                void lightboxImg.offsetWidth;
                
                if (isNavigation) {
                    // Animasi slide saat navigasi tombol
                    if (slideDirection === 'left') {
                        lightboxImg.classList.add('slide-left');
                    } else {
                        lightboxImg.classList.add('slide-right');
                    }
                } else {
                    // Animasi fade-in saat membuka lightbox pertama kali
                    lightboxImg.classList.add('fade-in');
                }
                
                lightboxImg.src = filteredData[index].image;
                
                // Sembunyikan nama jika di Hidden Album
                const photoNameDisplay = document.getElementById('photo-name-display');
                if (menuHidden.classList.contains('active')) {
                    photoNameDisplay.style.display = 'none';
                } else {
                    photoNameDisplay.style.display = 'block';
                    photoNameDisplay.textContent = filteredData[index].title;
                }
                
                if (!isLightboxOpen) {
                    lightbox.classList.add('active');
                    isLightboxOpen = true;
                    document.body.style.overflow = 'hidden';
                }
            }

            closeLightbox.addEventListener('click', () => { closeLightboxFunc(); });
            
            function closeLightboxFunc() {
                // Tambahkan class closing untuk memicu animasi fade-out
                lightbox.classList.add('closing');
                
                // Setelah animasi fade-out selesai (0.4s), hapus class active dan closing
                setTimeout(() => {
                    lightbox.classList.remove('active');
                    lightbox.classList.remove('closing');
                    document.body.style.overflow = 'auto';
                    isLightboxOpen = false;
                }, 400);
            }
            prevBtn.addEventListener('click', (e) => { 
                e.stopPropagation(); 
                slideDirection = 'left';
                currentPhotoIndex = (currentPhotoIndex - 1 + filteredData.length) % filteredData.length; 
                openLightbox(currentPhotoIndex, true); 
            });
            nextBtn.addEventListener('click', (e) => { 
                e.stopPropagation(); 
                slideDirection = 'right';
                currentPhotoIndex = (currentPhotoIndex + 1) % filteredData.length; 
                openLightbox(currentPhotoIndex, true); 
            });

            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) header.classList.add('scrolled');
                else header.classList.remove('scrolled');
                revealOnScroll();
            });

            mobileMenu.addEventListener('click', () => { sidebar.classList.add('active'); sidebarOverlay.classList.add('active'); });
            function closeSidebarFunc() { sidebar.classList.remove('active'); sidebarOverlay.classList.remove('active'); }
            closeSidebar.addEventListener('click', closeSidebarFunc);
            sidebarOverlay.addEventListener('click', closeSidebarFunc);

            function revealOnScroll() {
                const reveals = document.querySelectorAll('.scroll-reveal');
                reveals.forEach(el => {
                    const windowHeight = window.innerHeight;
                    const revealTop = el.getBoundingClientRect().top;
                    if (revealTop < windowHeight - 150) el.classList.add('visible');
                });
            }

            function startCounters() {
                document.querySelectorAll('.counter').forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const updateCount = () => {
                        const count = +counter.innerText;
                        const inc = target / 200;
                        if (count < target) { counter.innerText = Math.ceil(count + inc); setTimeout(updateCount, 1); }
                        else counter.innerText = target;
                    };
                    updateCount();
                });
            }

            // Profile Logic
            function calculateAge(birthDateString) {
                const birthDate = new Date(birthDateString);
                const now = new Date();
                let years = now.getFullYear() - birthDate.getFullYear();
                let months = now.getMonth() - birthDate.getMonth();
                let days = now.getDate() - birthDate.getDate();
                if (days < 0) { months--; const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0); days += lastMonth.getDate(); }
                if (months < 0) { years--; months += 12; }
                let result = `${years} Tahun ${months} Bulan`;
                if (days > 0) result += ` ${days} Hari`;
                return result;
            }
            function calculateDaysSince(dateString) {
                const start = new Date(dateString); const today = new Date();
                start.setHours(0,0,0,0); today.setHours(0,0,0,0);
                return Math.floor((today-start)/86400000);
            }

            document.querySelectorAll('.umur-value').forEach(el => { const b = el.dataset.birth; if(b) el.textContent = calculateAge(b); });
            document.querySelectorAll('.hari-value').forEach(el => { const s = el.dataset.since; if(s) el.textContent = calculateDaysSince(s).toLocaleString('id-ID') + ' Hari'; });

            // Update total foto count on Home
            const totalFotoCount = document.getElementById('total-foto-count');
            if (totalFotoCount) totalFotoCount.textContent = galleryData.length;

            // Audio Player Logic
            let currentAudioIndex = -1;
            const audioPlayer = new Audio();

            function renderAudioGallery() {
                const audioGrid = document.getElementById('audio-grid');
                audioGrid.innerHTML = '';

                audioData.forEach((audio, index) => {
                    const card = document.createElement('div');
                    card.className = 'audio-card scroll-reveal';
                    card.innerHTML = `
                        <div class="audio-progress-container" data-index="${index}">
                            <div class="audio-progress-bar">
                                <div class="audio-progress-thumb"></div>
                            </div>
                        </div>
                        <div class="audio-controls">
                            <button class="share-btn" data-index="${index}" title="Share Website">
                                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                            </button>
                            <button class="control-btn prev-audio" data-index="${index}">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5" stroke="currentColor" stroke-width="2"></line></svg>
                            </button>
                            <button class="control-btn play-pause-btn" data-index="${index}">
                                <svg class="play-icon" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                <svg class="pause-icon" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" style="display:none;"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                            </button>
                            <button class="control-btn next-audio" data-index="${index}">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" stroke-width="2"></line></svg>
                            </button>
                            <a href="${audio.url}" download class="download-btn" title="Download Audio">
                                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            </a>
                        </div>
                    `;

                    const playBtn = card.querySelector('.play-pause-btn');
                    const prevBtn = card.querySelector('.prev-audio');
                    const nextBtn = card.querySelector('.next-audio');
                    const shareBtn = card.querySelector('.share-btn');
                    const progressContainer = card.querySelector('.audio-progress-container');

                    playBtn.addEventListener('click', () => toggleAudio(index));
                    prevBtn.addEventListener('click', () => playPrevious());
                    nextBtn.addEventListener('click', () => playNext());
                    shareBtn.addEventListener('click', () => {
                        const siteUrl = window.location.href;
                        if (navigator.share) {
                            navigator.share({
                                title: 'Audio Collection',
                                text: 'Lihat audio keren ini!',
                                url: siteUrl
                            }).catch(console.error);
                        } else {
                            navigator.clipboard.writeText(siteUrl).then(() => {
                                alert('Link website berhasil disalin!');
                            });
                        }
                    });
                    
                    progressContainer.addEventListener('click', (e) => {
                        if (currentAudioIndex === index) {
                            const width = progressContainer.clientWidth;
                            const clickX = e.offsetX;
                            const duration = audioPlayer.duration;
                            audioPlayer.currentTime = (clickX / width) * duration;
                        }
                    });

                    audioGrid.appendChild(card);
                });
                updatePlayerUI();
                setTimeout(revealOnScroll, 100);
            }

            function toggleAudio(index) {
                if (currentAudioIndex === index) {
                    if (audioPlayer.paused) {
                        audioPlayer.play();
                    } else {
                        audioPlayer.pause();
                    }
                } else {
                    currentAudioIndex = index;
                    audioPlayer.src = audioData[index].url;
                    audioPlayer.play();
                }
                updatePlayerUI();
            }

            function playNext() {
                let nextIndex = (currentAudioIndex + 1) % audioData.length;
                toggleAudio(nextIndex);
            }

            function playPrevious() {
                let prevIndex = (currentAudioIndex - 1 + audioData.length) % audioData.length;
                toggleAudio(prevIndex);
            }

            audioPlayer.addEventListener('ended', () => {
                playNext();
            });

            audioPlayer.addEventListener('play', updatePlayerUI);
            audioPlayer.addEventListener('pause', updatePlayerUI);
            audioPlayer.addEventListener('timeupdate', updateProgress);

            function updateProgress() {
                if (currentAudioIndex !== -1) {
                    const duration = audioPlayer.duration;
                    const currentTime = audioPlayer.currentTime;
                    const progressPercent = (currentTime / duration) * 100;
                    
                    const allCards = document.querySelectorAll('.audio-card');
                    const activeCard = allCards[currentAudioIndex];
                    if (activeCard) {
                        const progressBar = activeCard.querySelector('.audio-progress-bar');
                        if (progressBar) {
                            progressBar.style.width = `${progressPercent}%`;
                        }
                    }
                }
            }

            function updatePlayerUI() {
                const allPlayBtns = document.querySelectorAll('.play-pause-btn');
                const allProgressBars = document.querySelectorAll('.audio-progress-bar');
                
                allPlayBtns.forEach((btn, idx) => {
                    const playIcon = btn.querySelector('.play-icon');
                    const pauseIcon = btn.querySelector('.pause-icon');
                    const card = btn.closest('.audio-card');
                    
                    if (idx === currentAudioIndex) {
                        if (!audioPlayer.paused) {
                            playIcon.style.display = 'none';
                            pauseIcon.style.display = 'block';
                            card.style.borderColor = 'var(--primary)';
                        } else {
                            playIcon.style.display = 'block';
                            pauseIcon.style.display = 'none';
                        }
                    } else {
                        playIcon.style.display = 'block';
                        pauseIcon.style.display = 'none';
                        card.style.borderColor = 'var(--glass-border)';
                        if (allProgressBars[idx]) {
                            allProgressBars[idx].style.width = '0%';
                        }
                    }
                });
            }

            renderGallery(filteredData);

            // --- Fungsi untuk mengecek teks "Belum Ditentukan" ---
            function checkPlaceholderText() {
                document.querySelectorAll('.info-value').forEach(function(el) {
                    var text = (el.textContent || '').trim();
                    if (text === 'Belum Ditentukan') {
                        el.classList.add('placeholder-default');
                        el.classList.remove('muted');
                    } else if (text && text !== 'Belum Ditentukan') {
                        el.classList.remove('placeholder-default');
                        el.classList.remove('muted');
                    }
                });
            }
            // Jalankan saat halaman dimuat
            setTimeout(checkPlaceholderText, 500);
        });