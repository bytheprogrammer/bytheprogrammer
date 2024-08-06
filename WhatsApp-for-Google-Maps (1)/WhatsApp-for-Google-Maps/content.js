/* content.js */
/* ------------------ */

// Global değişkenler
let storeArray = [];
let seenStores = new Set();

const storeInfo = () => {
    // Select all store containers
    const storeContainers = document.querySelectorAll('div.UaQhfb.fontBodyMedium');

    // Mağaza adı ve telefon numarasını eşleştir
    storeContainers.forEach(container => {
        // Find store name and phone number within the container
        const storeName = container.querySelector('.qBF1Pd.fontHeadlineSmall')?.textContent.trim();
        const phoneNumber = container.querySelector('span.UsdlK')?.textContent.trim();

        // Mağaza adı ve telefon numarasını birleştir
        if (storeName && phoneNumber) {
            const storeKey = `${storeName} | ${phoneNumber}`;
        

            // Eğer mağaza daha önce eklenmemişse, array'e ekle ve Set'e ekle
            if (storeKey) {
                storeArray.push({
                    [`mağaza ${storeArray.length + 1}`]: {
                        "mağaza adı": storeName,
                        "telefon numarası": phoneNumber
                    }
                });
                seenStores.add(storeKey);
            }
        }
    });

    // Array'i konsola yazdır
    console.log(storeArray);

    // JSON dosyası oluştur ve indir
    const jsonBlob = new Blob([JSON.stringify(storeArray, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(jsonBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'storeData.json';
    a.click();
    URL.revokeObjectURL(url);
}

const addButton = () => {
    // Google Maps'in body'sini seç
    const body = document.querySelector('body.LoJzbe');
    
    if (body) {
        // Eğer buton zaten eklenmişse, tekrar ekleme
        if (!document.getElementById('showButton')) {
            // Yeni buton oluştur
            const showButton = document.createElement('button');
            showButton.id = 'showButton';
            showButton.textContent = 'SHOW';
            showButton.style.cssText = `
                position: fixed;
                top: 10px;
                right: 100px;
                z-index: 1000;
                padding: 8px 16px;
                background-color: #4285F4;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-weight: bold;
            `;

            // Butona tıklama olayı ekle
            showButton.addEventListener('click', () => {
                console.log('SHOW butonu tıklandı!');
                storeInfo();
            });

            // Butonu body'ye ekle
            body.appendChild(showButton);
        }
    } else {
        console.log('Google Maps body bulunamadı');
    }
};

const addWhatsAppIcons = () => {
    const phoneElements = document.querySelectorAll('button[data-tooltip="Telefon numarasını kopyala"]');

    phoneElements.forEach(phoneElement => {
        const phoneContainer = phoneElement.closest('div');
        if (!phoneContainer) return;

        // Numara metnini al
        const phoneNumberText = phoneContainer.textContent.trim();

        // Numara metnini rakamlara çevir
        let phoneNumber = phoneNumberText.replace(/[^0-9]/g, '');

        // Eğer numara 10 haneli ise (Türkiye için), ülke kodunu ekle
        if (phoneNumber.length === 10) {
            phoneNumber = '+90' + phoneNumber;
        } else if (phoneNumber.length === 11 && phoneNumber.startsWith('0')) {
            phoneNumber = '+90' + phoneNumber.slice(1);
        }

        // Numara formatını kontrol et
        if (!phoneNumber.startsWith('+')) {
            console.error('Geçersiz numara formatı:', phoneNumber);
            return;
        }

        // Daha önce eklenmiş bir simge olup olmadığını kontrol et
        if (phoneContainer.querySelector('.whatsapp-icon')) return;

        const whatsappIcon = document.createElement('img');
        whatsappIcon.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/767px-WhatsApp.svg.png';
        whatsappIcon.style.cursor = 'pointer';
        whatsappIcon.style.width = '24px';
        whatsappIcon.style.height = '24px';
        whatsappIcon.style.verticalAlign = 'middle';
        whatsappIcon.style.marginLeft = '180px'; // Numaranın hemen yanında
        whatsappIcon.style.pointerEvents = 'auto'; // Tıklanabilir olması için

        whatsappIcon.alt = 'WhatsApp';
        whatsappIcon.className = 'whatsapp-icon';

        whatsappIcon.addEventListener('click', (e) => {
            e.stopPropagation(); // Diğer click olaylarını engeller
            window.open(`https://wa.me/${phoneNumber}`, '_blank'); // WhatsApp sohbeti başlatır
        });

        // Telefon numarasının hemen yanına ikonu ekle
        const phoneTextElement = phoneContainer.querySelector('div');
        if (phoneTextElement) {
            phoneTextElement.style.display = 'flex';
            phoneTextElement.style.alignItems = 'center';
            phoneTextElement.appendChild(whatsappIcon);
        }

        // Diğer butonları gizle
        const otherButtons = phoneContainer.querySelectorAll('button:not([data-tooltip="Telefon numarasını kopyala"])');
        otherButtons.forEach(button => {
            button.style.display = 'none';
        });
    });
};
    
// MutationObserver'ı güncelle
const observer = new MutationObserver((mutations) => {
    for (let mutation of mutations) {
        if (mutation.type === 'childList') {
            setTimeout(() => {
                addWhatsAppIcons();
                addButton();
            }, [2000]); // 2 saniye bekle
            break;
        }
    }
});

// Gözlemlenecek hedefi değiştir
observer.observe(document.querySelector('div[role="main"]') || document.body, { childList: true, subtree: true });

observer.observe(document.body, { childList: true, subtree: true });

// Sayfa yüklendiğinde de çalıştır
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // İlk yüklenme durumunda butonun hemen eklenmesini sağlamak için setTimeout kullanabiliriz
        setTimeout(() => {
            addWhatsAppIcons();
            addButton();
            storeInfo();
        }, 2000);
    });
} else {
    // Sayfa zaten yüklenmişse hemen çalıştır
    addWhatsAppIcons();
    addButton();
    storeInfo();
}