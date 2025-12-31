// ============================================
// 정원 베이커리 카페 - 데이터 저장소
// LocalStorage를 활용한 간단한 데이터 관리
// ============================================

// 초기 데이터
const initialData = {
    // 메뉴 데이터
    menus: [
        // 베이커리
        {
            id: 1,
            category: 'bread',
            name: '정원 소금빵',
            description: '버터 풍미 가득한 시그니처 소금빵',
            price: 3500,
            badge: 'BEST',
            image: 'images/salt_bread_1767161749736.png',
            isActive: true
        },
        {
            id: 2,
            category: 'bread',
            name: '크림치즈 베이글',
            description: '쫄깃한 베이글과 풍성한 크림치즈',
            price: 5000,
            badge: 'HOT',
            image: 'images/cream_cheese_bagel_1767161769157.png',
            isActive: true
        },
        {
            id: 3,
            category: 'bread',
            name: '크루아상',
            description: '겉은 바삭하고 속은 촉촉한 프랑스식 크루아상',
            price: 4000,
            badge: null,
            image: 'images/croissant_1767161784938.png',
            isActive: true
        },
        {
            id: 4,
            category: 'bread',
            name: '앙버터',
            description: '달콤한 앙금과 고소한 버터의 만남',
            price: 4500,
            badge: null,
            image: 'images/ang_butter_1767161802601.png',
            isActive: true
        },
        {
            id: 5,
            category: 'bread',
            name: '식빵',
            description: '매일 아침 굽는 부드러운 우유 식빵',
            price: 5500,
            badge: null,
            image: 'images/milk_loaf_1767161819966.png',
            isActive: true
        },
        {
            id: 6,
            category: 'bread',
            name: '바게트',
            description: '겉은 바삭하고 속은 쫄깃한 프랑스 바게트',
            price: 4000,
            badge: null,
            image: 'images/baguette_1767161838286.png',
            isActive: true
        },
        // 커피
        {
            id: 7,
            category: 'coffee',
            name: '가든 라떼',
            description: '부드러운 크레마와 고소한 원두의 조화',
            price: 5500,
            badge: 'NEW',
            image: 'images/garden_latte_1767161863293.png',
            isActive: true
        },
        {
            id: 8,
            category: 'coffee',
            name: '아메리카노',
            description: '깊고 진한 에스프레소의 풍미',
            price: 4500,
            badge: null,
            image: 'images/americano_1767161881273.png',
            isActive: true
        },
        {
            id: 9,
            category: 'coffee',
            name: '바닐라 라떼',
            description: '은은한 바닐라 향이 더해진 라떼',
            price: 5500,
            badge: null,
            image: 'images/vanilla_latte_1767161900384.png',
            isActive: true
        },
        {
            id: 10,
            category: 'coffee',
            name: '카푸치노',
            description: '풍성한 우유 거품과 에스프레소의 조화',
            price: 5000,
            badge: null,
            image: 'images/cappuccino_1767161917142.png',
            isActive: true
        },
        {
            id: 11,
            category: 'coffee',
            name: '콜드브루',
            description: '12시간 저온 추출한 부드러운 커피',
            price: 5000,
            badge: null,
            image: 'images/cold_brew_1767161932022.png',
            isActive: true
        },
        {
            id: 12,
            category: 'coffee',
            name: '에스프레소',
            description: '진한 에스프레소 한 잔',
            price: 3500,
            badge: null,
            image: 'images/espresso_1767161948180.png',
            isActive: true
        },
        // 디저트
        {
            id: 13,
            category: 'dessert',
            name: '당근 케이크',
            description: '촉촉한 시트와 크림치즈 프로스팅',
            price: 6500,
            badge: null,
            image: 'images/carrot_cake_1767161979943.png',
            isActive: true
        },
        {
            id: 14,
            category: 'dessert',
            name: '티라미수',
            description: '진한 에스프레소와 마스카포네의 만남',
            price: 7000,
            badge: 'BEST',
            image: 'images/tiramisu_1767161997762.png',
            isActive: true
        },
        {
            id: 15,
            category: 'dessert',
            name: '레몬 타르트',
            description: '상큼한 레몬 커드와 바삭한 타르트',
            price: 6000,
            badge: null,
            image: 'images/lemon_tart_1767162011938.png',
            isActive: true
        },
        {
            id: 16,
            category: 'dessert',
            name: '치즈케이크',
            description: '진한 뉴욕 스타일 치즈케이크',
            price: 7000,
            badge: null,
            image: 'images/cheesecake_1767162028026.png',
            isActive: true
        },
        // 음료
        {
            id: 17,
            category: 'beverage',
            name: '유자차',
            description: '향긋한 국산 유자로 만든 따뜻한 차',
            price: 5500,
            badge: null,
            image: 'images/yuja_tea_1767162052130.png',
            isActive: true
        },
        {
            id: 18,
            category: 'beverage',
            name: '녹차 라떼',
            description: '고소한 우유와 진한 녹차의 조화',
            price: 5500,
            badge: null,
            image: 'images/green_tea_latte_1767162068760.png',
            isActive: true
        },
        {
            id: 19,
            category: 'beverage',
            name: '아이스티',
            description: '상큼한 복숭아 아이스티',
            price: 4500,
            badge: null,
            image: 'images/iced_tea_1767162084700.png',
            isActive: true
        },
        {
            id: 20,
            category: 'beverage',
            name: '스무디',
            description: '신선한 과일로 만든 베리 스무디',
            price: 6000,
            badge: 'NEW',
            image: 'images/berry_smoothie_1767162102130.png',
            isActive: true
        }
    ],

    // 갤러리 데이터
    gallery: [
        {
            id: 1,
            title: '아침의 정원',
            description: '햇살 가득한 아침 테라스',
            image: 'images/morning_garden_1767162863357.png',
            createdAt: '2024-12-01'
        },
        {
            id: 2,
            title: '신선한 빵',
            description: '매일 아침 갓 구운 빵들',
            image: null,
            createdAt: '2024-12-05'
        },
        {
            id: 3,
            title: '라떼 아트',
            description: '정성스럽게 그린 라떼 아트',
            image: null,
            createdAt: '2024-12-10'
        },
        {
            id: 4,
            title: '가을 풍경',
            description: '카페 앞 은행나무 풍경',
            image: null,
            createdAt: '2024-12-15'
        },
        {
            id: 5,
            title: '디저트 모음',
            description: '오늘의 수제 디저트',
            image: null,
            createdAt: '2024-12-20'
        },
        {
            id: 6,
            title: '크리스마스 장식',
            description: '겨울 분위기 가득한 인테리어',
            image: null,
            createdAt: '2024-12-25'
        },
        {
            id: 7,
            title: '커피 타임',
            description: '여유로운 오후의 커피 한 잔',
            image: null,
            createdAt: '2024-12-28'
        },
        {
            id: 8,
            title: '정원 베이커리',
            description: '카페 전경',
            image: null,
            createdAt: '2024-12-30'
        }
    ],

    // 블로그 데이터
    blogs: [
        {
            id: 1,
            category: '공지사항',
            title: '2025년 새해 영업 안내',
            excerpt: '새해 복 많이 받으세요! 2025년 영업 일정을 안내드립니다.',
            content: `
                <p>안녕하세요, 정원 베이커리 카페입니다.</p>
                <p>2025년 새해가 밝았습니다! 올 한 해도 정원 베이커리와 함께 따뜻하고 행복한 시간 보내시길 바랍니다.</p>
                <h2>새해 영업 일정</h2>
                <p>- 1월 1일: 정상 영업 (11:00 - 20:00)<br>
                - 1월 2일부터: 정상 영업</p>
                <p>새해에도 변함없는 사랑 부탁드립니다. 감사합니다.</p>
            `,
            image: null,
            author: '정원 베이커리',
            createdAt: '2024-12-30',
            status: 'published'
        },
        {
            id: 2,
            category: '신메뉴',
            title: '겨울 한정 딸기 시리즈 출시',
            excerpt: '달콤한 겨울 딸기로 만든 특별한 메뉴를 만나보세요.',
            content: `
                <p>정원 베이커리에서 겨울 한정 딸기 시리즈를 선보입니다!</p>
                <h2>신메뉴 소개</h2>
                <p><strong>딸기 크루아상</strong> - 바삭한 크루아상 속에 신선한 딸기 크림</p>
                <p><strong>딸기 라떼</strong> - 부드러운 우유와 달콤한 딸기의 조화</p>
                <p><strong>딸기 치즈케이크</strong> - 진한 치즈케이크 위에 딸기 토핑</p>
                <p>한정 기간 동안만 만나볼 수 있는 특별한 메뉴입니다. 많은 관심 부탁드립니다!</p>
            `,
            image: null,
            author: '정원 베이커리',
            createdAt: '2024-12-25',
            status: 'published'
        },
        {
            id: 3,
            category: '이벤트',
            title: '연말 감사 이벤트 - 음료 1+1',
            excerpt: '한 해 동안 사랑해주신 고객분들께 감사의 마음을 전합니다.',
            content: `
                <p>정원 베이커리 카페를 사랑해주시는 고객분들께 감사드립니다.</p>
                <h2>이벤트 내용</h2>
                <p>12월 한 달간, 오후 2시~4시 사이 음료 주문 시 같은 음료 1잔을 무료로 드립니다!</p>
                <h2>이벤트 기간</h2>
                <p>2024년 12월 1일 ~ 12월 31일</p>
                <p>※ 일부 음료는 이벤트 대상에서 제외될 수 있습니다.</p>
            `,
            image: null,
            author: '정원 베이커리',
            createdAt: '2024-12-01',
            status: 'published'
        },
        {
            id: 4,
            category: '레시피',
            title: '집에서 만드는 간단 소금빵 레시피',
            excerpt: '정원 베이커리의 인기 메뉴 소금빵을 집에서도 만들어보세요.',
            content: `
                <p>많은 분들이 사랑해주시는 정원 소금빵! 집에서도 쉽게 만들 수 있는 레시피를 공유합니다.</p>
                <h2>재료</h2>
                <p>강력분 250g, 이스트 3g, 설탕 20g, 소금 3g, 버터 30g, 우유 150ml</p>
                <h2>만드는 법</h2>
                <p>1. 모든 재료를 섞어 반죽합니다.<br>
                2. 1차 발효 60분<br>
                3. 8등분하여 모양을 잡습니다.<br>
                4. 2차 발효 40분<br>
                5. 190도에서 15분간 굽습니다.</p>
                <p>집에서도 따뜻한 소금빵을 즐겨보세요!</p>
            `,
            image: null,
            author: '정원 베이커리',
            createdAt: '2024-11-20',
            status: 'published'
        },
        {
            id: 5,
            category: '이야기',
            title: '정원 베이커리의 시작 이야기',
            excerpt: '작은 꿈에서 시작된 정원 베이커리 카페의 이야기를 들려드립니다.',
            content: `
                <p>2024년, 작은 꿈 하나가 현실이 되었습니다.</p>
                <p>바쁜 일상 속에서 잠시 쉬어갈 수 있는 따뜻한 공간을 만들고 싶었습니다.
                정성껏 구운 빵 한 조각과 향긋한 커피 한 잔으로 여러분의 하루에 작은 행복을 더하고 싶었습니다.</p>
                <p>'정원'이라는 이름처럼, 이곳이 여러분의 마음속 작은 정원이 되길 바랍니다.</p>
                <p>앞으로도 정원 베이커리는 변함없이 최선을 다하겠습니다. 감사합니다.</p>
            `,
            image: null,
            author: '정원 베이커리',
            createdAt: '2024-10-15',
            status: 'published'
        },
        {
            id: 6,
            category: '공지사항',
            title: '주차 안내',
            excerpt: '정원 베이커리 카페 이용 시 주차 관련 안내사항입니다.',
            content: `
                <p>정원 베이커리 카페 방문 시 주차 안내입니다.</p>
                <h2>주차 안내</h2>
                <p>- 건물 내 지하주차장 이용 가능 (2시간 무료)<br>
                - 2시간 이후 10분당 500원<br>
                - 인근 공영주차장: 도보 3분</p>
                <p>편안한 방문 되시길 바랍니다.</p>
            `,
            image: null,
            author: '정원 베이커리',
            createdAt: '2024-09-01',
            status: 'published'
        }
    ],

    // 카페 정보
    cafeInfo: {
        name: '정원 베이커리 카페',
        address: '서울시 강남구 테헤란로 123 정원빌딩 1층',
        phone: '02-1234-5678',
        email: 'hello@gardenbakery.kr',
        instagram: '@garden_bakery',
        hours: {
            weekday: '08:00 - 21:00',
            weekend: '09:00 - 22:00',
            holiday: '매주 월요일 휴무'
        }
    },

    // 관리자 정보
    admin: {
        username: 'admin',
        password: 'garden2024', // 실제 서비스에서는 해시 처리 필요
        name: '관리자'
    }
};

// 데이터 매니저
const DataManager = {
    // 초기화
    init() {
        // 개발/수정 단계에서 데이터 갱신을 위해 무조건 리셋
        this.resetData();
    },

    // 데이터 초기화
    resetData() {
        localStorage.setItem('gardenBakeryData', JSON.stringify(initialData));
    },

    // 전체 데이터 가져오기
    getData() {
        return JSON.parse(localStorage.getItem('gardenBakeryData'));
    },

    // 전체 데이터 저장
    setData(data) {
        localStorage.setItem('gardenBakeryData', JSON.stringify(data));
    },

    // 메뉴 관련
    getMenus(category = null) {
        const data = this.getData();
        if (category && category !== 'all') {
            return data.menus.filter(m => m.category === category && m.isActive);
        }
        return data.menus.filter(m => m.isActive);
    },

    getMenuById(id) {
        const data = this.getData();
        return data.menus.find(m => m.id === id);
    },

    addMenu(menu) {
        const data = this.getData();
        menu.id = Date.now();
        data.menus.push(menu);
        this.setData(data);
        return menu;
    },

    updateMenu(id, updates) {
        const data = this.getData();
        const index = data.menus.findIndex(m => m.id === id);
        if (index !== -1) {
            data.menus[index] = { ...data.menus[index], ...updates };
            this.setData(data);
            return data.menus[index];
        }
        return null;
    },

    deleteMenu(id) {
        const data = this.getData();
        data.menus = data.menus.filter(m => m.id !== id);
        this.setData(data);
    },

    // 갤러리 관련
    getGallery() {
        const data = this.getData();
        return data.gallery.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },

    getGalleryById(id) {
        const data = this.getData();
        return data.gallery.find(g => g.id === id);
    },

    addGalleryItem(item) {
        const data = this.getData();
        item.id = Date.now();
        item.createdAt = new Date().toISOString().split('T')[0];
        data.gallery.push(item);
        this.setData(data);
        return item;
    },

    updateGalleryItem(id, updates) {
        const data = this.getData();
        const index = data.gallery.findIndex(g => g.id === id);
        if (index !== -1) {
            data.gallery[index] = { ...data.gallery[index], ...updates };
            this.setData(data);
            return data.gallery[index];
        }
        return null;
    },

    deleteGalleryItem(id) {
        const data = this.getData();
        data.gallery = data.gallery.filter(g => g.id !== id);
        this.setData(data);
    },

    // 블로그 관련
    getBlogs(status = null) {
        const data = this.getData();
        let blogs = data.blogs;
        if (status) {
            blogs = blogs.filter(b => b.status === status);
        }
        return blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },

    getBlogById(id) {
        const data = this.getData();
        return data.blogs.find(b => b.id === id);
    },

    addBlog(blog) {
        const data = this.getData();
        blog.id = Date.now();
        blog.createdAt = new Date().toISOString().split('T')[0];
        blog.author = '정원 베이커리';
        data.blogs.push(blog);
        this.setData(data);
        return blog;
    },

    updateBlog(id, updates) {
        const data = this.getData();
        const index = data.blogs.findIndex(b => b.id === id);
        if (index !== -1) {
            data.blogs[index] = { ...data.blogs[index], ...updates };
            this.setData(data);
            return data.blogs[index];
        }
        return null;
    },

    deleteBlog(id) {
        const data = this.getData();
        data.blogs = data.blogs.filter(b => b.id !== id);
        this.setData(data);
    },

    // 카페 정보
    getCafeInfo() {
        const data = this.getData();
        return data.cafeInfo;
    },

    updateCafeInfo(updates) {
        const data = this.getData();
        data.cafeInfo = { ...data.cafeInfo, ...updates };
        this.setData(data);
        return data.cafeInfo;
    },

    // 관리자 인증
    login(username, password) {
        const data = this.getData();
        if (data.admin.username === username && data.admin.password === password) {
            sessionStorage.setItem('adminLoggedIn', 'true');
            return true;
        }
        return false;
    },

    logout() {
        sessionStorage.removeItem('adminLoggedIn');
    },

    isLoggedIn() {
        return sessionStorage.getItem('adminLoggedIn') === 'true';
    },

    // 통계
    getStats() {
        const data = this.getData();
        return {
            totalMenus: data.menus.filter(m => m.isActive).length,
            totalGallery: data.gallery.length,
            totalBlogs: data.blogs.filter(b => b.status === 'published').length,
            draftBlogs: data.blogs.filter(b => b.status === 'draft').length
        };
    }
};

// 페이지 로드 시 초기화
DataManager.init();

// 카테고리 한글명
const categoryNames = {
    bread: '베이커리',
    coffee: '커피',
    dessert: '디저트',
    beverage: '음료'
};

// 카테고리 아이콘
const categoryIcons = {
    bread: 'fas fa-bread-slice',
    coffee: 'fas fa-mug-hot',
    dessert: 'fas fa-birthday-cake',
    beverage: 'fas fa-glass-whiskey'
};

// 블로그 카테고리 색상
const blogCategoryColors = {
    '공지사항': '#8B6F5C',
    '신메뉴': '#7D9B76',
    '이벤트': '#D4A574',
    '레시피': '#C97B7B',
    '이야기': '#A68B7A'
};
