const { useState, useMemo, useRef, useEffect } = React;

const argumentTemplates = [
  (option) => `Потому что именно в ${option} вы давно мечтали отправиться, и судьба явно на вашей стороне.`,
  (option) => `${option} подарит свежие эмоции и новые знакомства — идеальный способ перезагрузиться.`,
  (option) => `Город ${option} отлично вписывается в ваш бюджет и сезон, так что почему бы и нет?`,
  (option) => `С ${option} совпадает прогноз погоды и настроение — идеальное совпадение!`,
  (option) => `Вы будете вспоминать поездку в ${option} ещё долгие годы — отличный аргумент за.`,
  (option) => `Для ${option} уже есть удобные рейсы и классные отели — удобство решает.`,
  (option) => `Каждая фотография из ${option} — потенциальный хит в ваших соцсетях.`,
  (option) => `Гастрономические открытия в ${option} — то, что вашему отпуску точно нужно.`,
  (option) => `Друзья до сих пор рассказывают истории про ${option}, пора создавать свои.`,
  (option) => `В ${option} легко совместить отдых и приключения — универсальный выбор для всей компании.`,
];

const destinationData = {
  "греция": {
    argument: "Санторини и Миконос подарят красивые закаты и фото, которые хочется пересматривать.",
    image: "https://dip.org.ua/wp-content/uploads/2023/03/154103686-56a3b15d3df78cf7727e9fc3.jpg",
    travel: {
      flights: [
        {
          provider: "AviaMock",
          from: "Москва",
          price: "от 24 500 ₽",
          link: "#",
          description: "Прямой рейс до Афин, 3,5 часа в пути.",
        },
        {
          provider: "SkyNow",
          from: "Санкт-Петербург",
          price: "от 27 900 ₽",
          link: "#",
          description: "Пересадка в Риме, прилёт на Санторини.",
        },
      ],
      hotels: [
        {
          name: "Santorini Blue Suites",
          nights: "7 ночей",
          price: "от 68 000 ₽",
          link: "#",
          description: "Вид на кальдеру, бассейн-инфинити и завтраки с видом на море.",
        },
        {
          name: "Athenian Vibes Hotel",
          nights: "5 ночей",
          price: "от 42 600 ₽",
          link: "#",
          description: "Современный бутик-отель в центре Афин, рядом с Акрополем.",
        },
      ],
    },
  },
  "таиланд": {
    argument: "Пхукет, уличная еда в Бангкоке и лазурные воды островов создадут идеальный тропический сценарий.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1350&q=80",
    travel: {
      flights: [
        {
          provider: "AviaMock",
          from: "Москва",
          price: "от 31 200 ₽",
          link: "#",
          description: "Прямой рейс до Бангкока, багаж включён.",
        },
        {
          provider: "AsiaWings",
          from: "Новосибирск",
          price: "от 29 900 ₽",
          link: "#",
          description: "Удобная стыковка в Ханое, прибытие на Пхукет.",
        },
      ],
      hotels: [
        {
          name: "Phuket Breeze Resort",
          nights: "10 ночей",
          price: "от 55 400 ₽",
          link: "#",
          description: "Пляж Карон, просторные номера и тайский спа.",
        },
        {
          name: "Bangkok Rooftop Hotel",
          nights: "4 ночи",
          price: "от 24 700 ₽",
          link: "#",
          description: "Бассейн на крыше, кафе с видом на Чао Прайя.",
        },
      ],
    },
  },
  "италия": {
    argument: "Комбинация тосканских вин, флорентийских галерей и римского колорита — классика отпускных мечтаний.",
    image: "https://images.unsplash.com/photo-1526481280695-3c46977f9280?auto=format&fit=crop&w=1350&q=80",
    travel: {
      flights: [
        {
          provider: "EuroFly",
          from: "Москва",
          price: "от 26 800 ₽",
          link: "#",
          description: "Прямой рейс в Рим, вылет утром.",
        },
        {
          provider: "CityBreak Air",
          from: "Казань",
          price: "от 28 900 ₽",
          link: "#",
          description: "Пересадка в Берлине, прилёт во Флоренцию.",
        },
      ],
      hotels: [
        {
          name: "Rome Heritage Boutique",
          nights: "6 ночей",
          price: "от 54 300 ₽",
          link: "#",
          description: "В пяти минутах от Колизея, авторские экскурсии.",
        },
        {
          name: "Florence Art Stay",
          nights: "5 ночей",
          price: "от 48 900 ₽",
          link: "#",
          description: "Старинное палаццо, завтраки на террасе с видом на Дуомо.",
        },
      ],
    },
  },
  "испания": {
    argument: "Барселона, Гауди и уютные тарелки с тапас — лучший способ сделать неделю жаркой и вкусной.",
    image: "https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?auto=format&fit=crop&w=1350&q=80",
    travel: {
      flights: [
        {
          provider: "IberiaLite",
          from: "Москва",
          price: "от 25 700 ₽",
          link: "#",
          description: "Прямой рейс до Барселоны, вечерний вылет.",
        },
        {
          provider: "SunAir",
          from: "Екатеринбург",
          price: "от 30 200 ₽",
          link: "#",
          description: "Стыковка в Стамбуле, прибытие в Мадрид.",
        },
      ],
      hotels: [
        {
          name: "Barcelona Coastline Hotel",
          nights: "7 ночей",
          price: "от 57 600 ₽",
          link: "#",
          description: "Набережная Барселонеты, бассейн на крыше и тапас-бар.",
        },
        {
          name: "Madrid Central Stay",
          nights: "5 ночей",
          price: "от 39 500 ₽",
          link: "#",
          description: "Пешком до Пласа-Майор, уютные номера в стиле арт-деко.",
        },
      ],
    },
  },
  "португалия": {
    argument: "Порту и Лиссабон впечатлят видами на океан, пастел-де-ната и атмосферой маленьких улочек.",
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1350&q=80",
    travel: {
      flights: [
        {
          provider: "AtlanticAir",
          from: "Москва",
          price: "от 33 700 ₽",
          link: "#",
          description: "Прямой рейс до Лиссабона, багаж 23 кг.",
        },
        {
          provider: "TravelWest",
          from: "Минск",
          price: "от 29 900 ₽",
          link: "#",
          description: "Пересадка в Париже, прилёт в Порту.",
        },
      ],
      hotels: [
        {
          name: "Lisbon River View",
          nights: "6 ночей",
          price: "от 44 200 ₽",
          link: "#",
          description: "Апартаменты в районе Байру Алту, завтраки с пастел-де-ната.",
        },
        {
          name: "Porto Wine House",
          nights: "4 ночи",
          price: "от 32 400 ₽",
          link: "#",
          description: "Бутик-отель на набережной Дору, дегустации портвейна.",
        },
      ],
    },
  },
  "мальдивы": {
    argument: "Виллы над водой, прозрачные лагуны и звёздное небо без городской подсветки — чистое спокойствие.",
    image: "https://images.unsplash.com/photo-1521207418485-99c705420785?auto=format&fit=crop&w=1350&q=80",
    travel: {
      flights: [
        {
          provider: "OceanicAir",
          from: "Москва",
          price: "от 54 800 ₽",
          link: "#",
          description: "Прямой рейс до Мале, питание включено.",
        },
        {
          provider: "IslandHop",
          from: "Сочи",
          price: "от 49 900 ₽",
          link: "#",
          description: "Стыковка в Дохе, прибытие на Мале утром.",
        },
      ],
      hotels: [
        {
          name: "Lagoon Villa Resort",
          nights: "8 ночей",
          price: "от 112 000 ₽",
          link: "#",
          description: "Вилла над водой с приватной террасой и сноркелингом.",
        },
        {
          name: "Coral Sands Retreat",
          nights: "6 ночей",
          price: "от 98 500 ₽",
          link: "#",
          description: "Песчаный пляж, персональный батлер и ужины на берегу.",
        },
      ],
    },
  },
  "бали": {
    argument: "Рисовые террасы Убудa, тёплые волны Чангу и вечера с live-музыкой подарят баланс приключений и релакса.",
    image: "https://images.unsplash.com/photo-1543248939-ff40856f65d4?auto=format&fit=crop&w=1350&q=80",
    travel: {
      flights: [
        {
          provider: "IslandHop",
          from: "Москва",
          price: "от 46 300 ₽",
          link: "#",
          description: "Стыковка в Сингапуре, прилёт в Денпасар утром.",
        },
        {
          provider: "AsiaWings",
          from: "Красноярск",
          price: "от 44 900 ₽",
          link: "#",
          description: "Пересадка в Бангкоке, багаж 25 кг.",
        },
      ],
      hotels: [
        {
          name: "Ubud Jungle Retreat",
          nights: "7 ночей",
          price: "от 53 700 ₽",
          link: "#",
          description: "Виллы с видом на джунгли, йога по утрам, органические завтраки.",
        },
        {
          name: "Canggu Surf Lodge",
          nights: "6 ночей",
          price: "от 41 200 ₽",
          link: "#",
          description: "Пешком до серф-спотов, вечерние барбекю и вечеринка на закате.",
        },
      ],
    },
  },
  "япония": {
    argument: "Токио, храмы Киото и сакура в парках — концентрат эстетики и современных впечатлений.",
    image: "https://images.unsplash.com/photo-1549693578-d683be217e58?auto=format&fit=crop&w=1350&q=80",
  },
  "турция": {
    argument: "Каппадокия с шарами на рассвете и морские курорты Эгейского побережья — два отпуска в одном.",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1350&q=80",
  },
  "франция": {
    argument: "Утренние круассаны в Париже и вечера с вином в Провансе — чистое удовольствие и вдохновение.",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1350&q=80",
  },
  "мексика": {
    argument: "Канкун, сеноты Юкатана и ароматные тако — яркое приключение, которое сложно забыть.",
    image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1350&q=80",
  },
  "куба": {
    argument: "Гавана с ретро-кабриолетами, танцами и кофе подарит киношное настроение.",
    image: "https://images.unsplash.com/photo-1526397751294-331021109c8a?auto=format&fit=crop&w=1350&q=80",
  },
  "сейшелы": {
    argument: "Гранитные валуны Ла-Диг, белый песок и лазурь Индийского океана — postcard-пейзажи вживую.",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1350&q=80",
  },
  "исландия": {
    argument: "Голубая лагуна, водопады и северное сияние — идеальный маршрут для эффектных приключений.",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1350&q=80",
  },
  "австралия": {
    argument: "Сёрф в Сиднее, барбекю на пляже и маршрут по Большому Барьерному рифу — отпуск с вау-эффектом.",
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=1350&q=80",
  },
  "доминикана": {
    argument: "Пальмы Пунта-Каны, карибская музыка и кокосы прямо с дерева — чистый релакс.",
    image: "https://images.unsplash.com/photo-1508273881495-5e8c1e1f4af4?auto=format&fit=crop&w=1350&q=80",
  },
  "бразилия": {
    argument: "Рио, пляж Копакабана и карнавальная энергия — лучший повод танцевать до утра.",
    image: "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?auto=format&fit=crop&w=1350&q=80",
  },
  "норвегия": {
    argument: "Фьорды, северные города и потрясающие дороги Атлантического побережья — природа без фильтров.",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1350&q=80",
  },
  "сша": {
    argument: "Калифорнийское побережье, парки Юты и огни Нью-Йорка — один отпуск, много историй.",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1350&q=80",
  },
};

const fallbackFlights = [
  {
    provider: "AviaMock",
    from: "Москва",
    price: "от 23 900 ₽",
    link: "#",
    description: "Удобный утренний вылет, только ручная кладь.",
  },
  {
    provider: "TripAir",
    from: "Санкт-Петербург",
    price: "от 28 400 ₽",
    link: "#",
    description: "Стыковка в крупном европейском хабе, гибкий тариф.",
  },
];

const fallbackHotels = [
  {
    name: "City Lights Hotel",
    nights: "5 ночей",
    price: "от 36 500 ₽",
    link: "#",
    description: "Современный дизайн, удобное расположение и завтраки включены.",
  },
  {
    name: "Sunset Bay Resort",
    nights: "7 ночей",
    price: "от 52 800 ₽",
    link: "#",
    description: "Пляжный отдых, бассейн и ежедневные активности.",
  },
];

const normalizeOption = (option) => option.trim().toLowerCase();

const getDestinationData = (option) => destinationData[normalizeOption(option)] || null;

const generateReason = (option) => {
  const index = Math.floor(Math.random() * argumentTemplates.length);
  return argumentTemplates[index](option);
};

const getDestinationImage = (option) => {
  const data = getDestinationData(option);
  if (data?.image) {
    return data.image;
  }

  return `https://source.unsplash.com/featured/?${encodeURIComponent(`${option}, vacation beach`)}`;
};

const getDestinationArgument = (option) => {
  const data = getDestinationData(option);
  return data?.argument || "";
};

const getDestinationTravel = (option) => {
  const data = getDestinationData(option);
  if (data?.travel) {
    return data.travel;
  }

  return {
    flights: fallbackFlights,
    hotels: fallbackHotels,
  };
};

const createOption = (title, argument) => ({
  id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2),
  title: title.trim(),
  argument: argument.trim(),
});

function App() {
  const [question, setQuestion] = useState("Куда поехать в отпуск?");
  const [optionTitle, setOptionTitle] = useState("");
  const [optionArgument, setOptionArgument] = useState("");
  const [options, setOptions] = useState(() => {
    const initialDestinations = ["Греция", "Таиланд", "Италия", "Испания", "Бали", "Мальдивы"];
    return initialDestinations.map((name) => {
      const dataArgument = getDestinationArgument(name);
      return createOption(name, dataArgument);
    });
  });
  const [isRolling, setIsRolling] = useState(false);
  const [activeOptionId, setActiveOptionId] = useState(null);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const rollingTimerRef = useRef(null);
  const rollingTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (rollingTimerRef.current) {
        clearInterval(rollingTimerRef.current);
      }
      if (rollingTimeoutRef.current) {
        clearTimeout(rollingTimeoutRef.current);
      }
    };
  }, []);

  const canDraw = useMemo(() => question.trim().length > 0 && options.length >= 2 && !isRolling, [question, options.length, isRolling]);

  const handleAddOption = () => {
    if (!optionTitle.trim()) {
      return;
    }

    const title = optionTitle.trim();
    const argument = optionArgument.trim() || getDestinationArgument(title);

    setOptions((prev) => [...prev, createOption(title, argument)]);
    setOptionTitle("");
    setOptionArgument("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && event.shiftKey === false) {
      event.preventDefault();
      handleAddOption();
    }
  };

  const handleRemoveOption = (id) => {
    setOptions((prev) => prev.filter((option) => option.id !== id));
  };

  const stopRolling = (finalOption) => {
    setIsRolling(false);
    setActiveOptionId(finalOption.id);

    const argument = finalOption.argument || getDestinationArgument(finalOption.title) || generateReason(finalOption.title);
    const imageUrl = getDestinationImage(finalOption.title);
    const travel = getDestinationTravel(finalOption.title);

    const newResult = {
      question: question.trim(),
      option: finalOption.title,
      argument,
      imageUrl,
      travel,
      timestamp: Date.now(),
    };

    setResult(newResult);
    setHistory((prev) => [newResult, ...prev].slice(0, 8));
  };

  const handleDraw = () => {
    if (!canDraw) {
      return;
    }

    setIsRolling(true);
    setResult(null);

    const totalRollTime = 2400 + Math.random() * 1200;
    const intervalTime = 120;

    let rollOrder = [...options];

    if (rollOrder.length > 1) {
      rollOrder = rollOrder
        .slice()
        .sort(() => Math.random() - 0.5)
        .concat(rollOrder.slice().sort(() => Math.random() - 0.5));
    }

    let currentIndex = 0;

    rollingTimerRef.current = setInterval(() => {
      setActiveOptionId(rollOrder[currentIndex % rollOrder.length].id);
      currentIndex += 1;
    }, intervalTime);

    rollingTimeoutRef.current = setTimeout(() => {
      if (rollingTimerRef.current) {
        clearInterval(rollingTimerRef.current);
      }

      const finalOption = options[Math.floor(Math.random() * options.length)];
      stopRolling(finalOption);
    }, totalRollTime);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Жребий — когда выбирает судьба</h1>
        <p>
          Красивый сервис для вдохновляющих решений. Введите вопрос, добавьте варианты и позвольте жребию выбрать,
          а мы подскажем, почему это отличный вариант.
        </p>
      </header>

      <main className="card">
        <section className="question-input">
          <input
            type="text"
            value={question}
            placeholder="Например: «Что приготовить на ужин?»"
            onChange={(event) => setQuestion(event.target.value)}
          />
        </section>

        <section className="options-form">
          <input
            type="text"
            value={optionTitle}
            placeholder="Вариант"
            onChange={(event) => setOptionTitle(event.target.value)}
            onKeyDown={handleKeyPress}
          />
          <input
            type="text"
            value={optionArgument}
            placeholder="Аргумент «за» (необязательно)"
            onChange={(event) => setOptionArgument(event.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            type="button"
            className="add-option-button"
            onClick={handleAddOption}
            disabled={!optionTitle.trim()}
          >
            ➕ Добавить вариант
          </button>
        </section>

        <section className="options-list">
          {options.map((option) => (
            <article
              key={option.id}
              className={`option-item${option.id === activeOptionId ? " active" : ""}`}
            >
              <div className="option-content">
                <span className="option-title">{option.title}</span>
                {(option.argument || getDestinationArgument(option.title) || option.id === activeOptionId) && (
                  <span className="option-argument">
                    {option.argument || getDestinationArgument(option.title) || "Судьба подсказывает, что это сильная идея."}
                  </span>
                )}
              </div>
              <button
                type="button"
                className="remove-option"
                onClick={() => handleRemoveOption(option.id)}
                aria-label={`Удалить вариант ${option.title}`}
              >
                ✕
              </button>
            </article>
          ))}
          {options.length === 0 && (
            <p className="hint">Добавьте хотя бы два варианта, чтобы жребий было из чего тянуть.</p>
          )}
        </section>

        <section className="actions">
          <button type="button" className="draw-button" disabled={!canDraw} onClick={handleDraw}>
            {isRolling ? "Выбираем..." : "Тянуть жребий"}
          </button>
          <span className="hint">
            Подсказка: нажмите Enter, чтобы быстро добавить вариант. Минимум два варианта для честного выбора.
          </span>
        </section>

        {result && (
          <section className="result-card" style={{ backgroundImage: `url(${result.imageUrl})` }}>
            <div className="result-card-content">
              <span className="result-title">{result.question}</span>
              <span className="result-option">{result.option}</span>
              <span className="result-argument">{result.argument}</span>
            </div>
          </section>
        )}

        {result && result.travel && (
          <section className="travel-suggestions">
            <div className="travel-suggestions-header">
              <h3>Подборка для поездки</h3>
              <span className="suggestion-note">Данные условные — для красивого вдохновения.</span>
            </div>
            <div className="suggestions-grid">
              <div className="suggestion-column">
                <span className="suggestion-column-title">Авиабилеты</span>
                {result.travel.flights.map((flight, index) => (
                  <a
                    key={`${flight.provider}-${index}`}
                    className="suggestion-card"
                    href={flight.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="suggestion-card-top">
                      <span className="suggestion-provider">{flight.provider}</span>
                      <span className="suggestion-price">{flight.price}</span>
                    </div>
                    <span className="suggestion-route">Из: {flight.from}</span>
                    <span className="suggestion-description">{flight.description}</span>
                  </a>
                ))}
              </div>
              <div className="suggestion-column">
                <span className="suggestion-column-title">Отели</span>
                {result.travel.hotels.map((hotel, index) => (
                  <a
                    key={`${hotel.name}-${index}`}
                    className="suggestion-card"
                    href={hotel.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="suggestion-card-top">
                      <span className="suggestion-provider">{hotel.name}</span>
                      <span className="suggestion-price">{hotel.price}</span>
                    </div>
                    <span className="suggestion-route">{hotel.nights}</span>
                    <span className="suggestion-description">{hotel.description}</span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {history.length > 0 && (
          <section className="history">
            <h3>Последние решения</h3>
            <div className="history-list">
              {history.map((item) => (
                <span key={item.timestamp + item.option} className="history-tag">
                  {item.option}
                </span>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        Сделано, чтобы решения было принимать легко. Поделитесь ссылкой и устройте свой мини-ритуал выбора.
      </footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

