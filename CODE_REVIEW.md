# Project Code Review နှင့် ပြုပြင်တိုးတက်ရေးလမ်းညွှန်

ဒီစာတမ်းက လက်ရှိ project ကို senior developer တစ်ယောက်က junior developer ကို လမ်းညွှန်သလို ရေးထားတာပါ။ Project က prototype အဆင့်မှာရှိသေးတာကြောင့် feature အသစ်တွေ အများကြီးထပ်မထည့်ခင် လက်ရှိအခြေခံကို မှန်ကန်၊ တည်ငြိမ်ပြီး ပြင်ဆင်ရလွယ်အောင် အရင်လုပ်သင့်ပါတယ်။

## လက်ရှိအခြေအနေ

ဒီ project က React, Vite, React Router, React Select နဲ့ Leaflet ကိုသုံးထားတဲ့ Japan property search application တစ်ခုဖြစ်ပါတယ်။ လက်ရှိမှာ:

- Home page
- Search filter page
- Saved page အကြမ်း
- Shared navigation bar
- Tokyo ကိုပြထားတဲ့ Leaflet map
- Station, property type နဲ့ radius ရွေးချယ်စရာများ

ရှိပါတယ်။

အောက်ပါ command တွေကို စစ်ဆေးပြီးပါပြီ:

```bash
npm ci
npm run lint
npm run build
```

အားလုံး အောင်မြင်ပါတယ်။ Dependency vulnerability လည်း လက်ရှိ audit အရ မတွေ့ပါ။

## ဒီတစ်ကြိမ် ပြင်ဆင်ပြီးသောအရာများ

### 1. Dependency lockfile ကို ပြန်ညှိထားသည်

အရင်က `package.json` နဲ့ `package-lock.json` မကိုက်ညီလို့ `npm ci` မအောင်မြင်ပါ။ `npm install` နဲ့ lockfile ကို ပြန်ညှိပြီး `npm ci` ကိုလည်း ပြန်စမ်းထားပါတယ်။

ဒီအချက်က အရေးကြီးပါတယ်။ ကိုယ့်စက်မှာ run ရုံနဲ့ မလုံလောက်ပါ။ နောက် developer တစ်ယောက်ရဲ့စက်၊ CI server နဲ့ production deployment မှာပါ dependency တူတူ install ဖြစ်ရပါမယ်။

### 2. Linux deployment မှာ ပျက်နိုင်သော import ကို ပြင်ထားသည်

အရင်က:

```jsx
import Searchfilter from "./pages/Seeker/searchfilter";
```

လို့ရေးထားပေမယ့် folder အမည်အမှန်က `seeker` ဖြစ်ပါတယ်။ Windows မှာ စာလုံးအကြီးအသေးကို ခွဲမထားလို့ run နိုင်ပေမယ့် Linux server မှာ `Seeker` နဲ့ `seeker` က မတူပါ။

အခု:

```jsx
import Searchfilter from "./pages/seeker/searchfilter";
```

လို့ ပြင်ထားပါတယ်။

## Project ကို Run လုပ်နည်း

### ပထမဆုံး setup

```bash
npm ci
npm run dev
```

Terminal မှာ Vite ပေးတဲ့ local URL ကို browser နဲ့ဖွင့်ပါ။ ပုံမှန်အားဖြင့်:

```text
http://localhost:5173
```

ဖြစ်ပါလိမ့်မယ်။

`npm run dev` က process နှစ်ခုကို တစ်ပြိုင်နက် run ပေးပါတယ်:

- React/Vite frontend — `http://localhost:5173`
- Express API server — `http://127.0.0.1:3001`

Home page မှာ database ချိတ်ဆက်မှုအခြေအနေကို ပြထားပါတယ်။ API ကို သီးခြားစစ်ချင်ရင်:

```text
http://127.0.0.1:3001/api/health/db
```

ကိုဖွင့်နိုင်ပါတယ်။

### PostgreSQL configuration

Database password ကို React source code သို့မဟုတ် Git repository ထဲ မထည့်ရပါ။ Local credential ကို `.env` ထဲမှာသာ ထားပါတယ်:

```dotenv
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@127.0.0.1:5432/postgres
PORT=3001
```

Developer အသစ်အတွက် `.env.example` ကို copy လုပ်ပြီး `.env` အဖြစ်ပြောင်းကာ ကိုယ့် password ထည့်ရပါမယ်။ `.env` ကို `.gitignore` ထဲထည့်ထားလို့ commit မဖြစ်ပါ။

Password ထဲမှာ `@`, `:`, `/`, `#` သို့မဟုတ် `%` လို URL special character ပါရင် URL encode လုပ်ရပါမယ်။ Production မှာ `.env` ဖိုင်ကို repository ထဲမတင်ဘဲ hosting provider ရဲ့ secret/environment-variable settings ကိုသုံးပါ။

### Code quality စစ်ရန်

```bash
npm run lint
```

### Production build စစ်ရန်

```bash
npm run build
```

### Build ထွက်လာသော application ကို preview ကြည့်ရန်

```bash
npm run preview
```

`npm install` နဲ့ `npm ci` ရဲ့ကွာခြားချက်ကိုလည်း နားလည်ထားသင့်ပါတယ်:

- Dependency ပြောင်းလိုက်တဲ့အခါ `npm install` သုံးပါ။
- Project ကို အသစ် clone လုပ်ပြီး lockfile အတိုင်း တိတိကျကျ install လုပ်ချင်ရင် `npm ci` သုံးပါ။
- CI/CD မှာ `npm ci` သုံးတာ ပိုသင့်တော်ပါတယ်။

---

## အရေးအကြီးဆုံး ဆက်ပြင်ရမည့်အရာများ

## 1. Search Form က အခုထိ အလုပ်မလုပ်သေးပါ

### လက်ရှိပြဿနာ

Station, property type နဲ့ radius ကို UI မှာ ရွေးလို့ရပေမယ့် React state ထဲမှာ မသိမ်းထားပါ။ Search button နဲ့ Save Search ကိုနှိပ်လည်း ဘာမှမလုပ်ပါ။

UI ပေါ်တာတစ်ခုတည်းကို feature ပြီးပြီလို့ မယူဆသင့်ပါ။ User action ကနေ result ထွက်တဲ့အထိ data flow အပြည့်ရှိရပါမယ်:

```text
User က filter ရွေးသည်
        ↓
React state ထဲတွင် value သိမ်းသည်
        ↓
User က Search နှိပ်သည်
        ↓
Input validation လုပ်သည်
        ↓
API သို့မဟုတ် local data မှ result ရှာသည်
        ↓
Property list နှင့် map marker များ update လုပ်သည်
```

### အကြံပြု implementation

Form state တစ်ခုထားပါ:

```jsx
const [filters, setFilters] = useState({
  searchBy: "station",
  station: null,
  propertyType: null,
  radius: null,
});
```

Select ကို controlled input ဖြစ်အောင်လုပ်ပါ:

```jsx
<Select
  options={stationOptions}
  value={filters.station}
  onChange={(station) =>
    setFilters((current) => ({ ...current, station }))
  }
  placeholder="Search station"
/>
```

Search controls အားလုံးကို form တစ်ခုထဲထားပြီး submit ကို handle လုပ်ပါ:

```jsx
function handleSubmit(event) {
  event.preventDefault();

  // Validate the selected filters.
  // Fetch or filter matching properties.
  // Update property results and map markers.
}
```

```jsx
<form onSubmit={handleSubmit}>
  {/* Filter controls */}
  <button type="submit">Search</button>
</form>
```

### ထပ်စဉ်းစားရမည့်အချက်

Station selector က top bar နဲ့ sidebar နှစ်နေရာမှာရှိပါတယ်။ နှစ်ခုစလုံးက filter တစ်ခုတည်းကို ကိုယ်စားပြုတယ်ဆိုရင် state တစ်ခုတည်းကို share လုပ်ရပါမယ်။ တစ်နေရာမှာ Tokyo၊ နောက်တစ်နေရာမှာ Shinjuku ဖြစ်နေတာမျိုး မဖြစ်သင့်ပါ။

---

## 2. Component တွေကို တာဝန်အလိုက် ခွဲသင့်ပါသည်

`searchfilter.jsx` တစ်ဖိုင်တည်းမှာ:

- Station data
- Property type data
- Radius data
- Select components
- Main form
- Sidebar
- Map layout

အားလုံး စုပြုံနေပါတယ်။ လက်ရှိ code နည်းလို့ ဖတ်နိုင်ပေမယ့် feature များလာရင် ပြင်ရခက်ပြီး bug တက်လွယ်လာပါမယ်။

အကြံပြု structure:

```text
src/
  components/
    layout/
      Navbar.jsx
    search/
      SearchForm.jsx
      SearchSidebar.jsx
      StationSelect.jsx
      PropertyTypeSelect.jsx
    map/
      PropertyMap.jsx
  data/
    stations.js
    propertyTypes.js
  pages/
    seeker/
      Home.jsx
      SearchFilter.jsx
      Saved.jsx
```

ဒါပေမယ့် component အသေးလေးတိုင်းကို အလွန်အကျွံ မခွဲပါနဲ့။ အောက်ပါအခြေအနေတွေမှာ ခွဲတာကောင်းပါတယ်:

- နေရာတစ်ခုထက်ပိုပြီး ပြန်သုံးရမယ်။
- ကိုယ်ပိုင် behavior သို့မဟုတ် state ရှိတယ်။
- Parent file က ဖတ်ရခက်လောက်အောင် ကြီးလာတယ်။
- သီးခြား test ရေးရင် အကျိုးရှိတယ်။

Naming ကိုလည်း consistency ရှိအောင်လုပ်ပါ:

```jsx
const stationOptions = [];
const propertyTypeOptions = [];
const radiusOptions = [];

function StationSelect() {}
function PropertyTypeSelect() {}
function SearchFilter() {}
```

React component နဲ့ component file ကို PascalCase သုံးတာက ပိုကောင်းပါတယ်။

---

## 3. Responsive Layout ကို ပြန်တည်ဆောက်သင့်ပါသည်

### လက်ရှိပြဿနာ

Layout ထဲမှာ:

```css
gap: 300px;
width: 350px;
margin-left: 40rem;
height: 400px;
```

လို fixed values အများကြီးသုံးထားပါတယ်။ Screen ကျဉ်းသွားရင် overflow ဖြစ်ပြီး map နဲ့ filter တွေ အပြင်ထွက်နိုင်ပါတယ်။

Map က flex row ထဲမှာရှိပြီး `margin-left: 40rem` နဲ့ ထပ်တွန်းထားတာကြောင့် layout ကိုခန့်မှန်းရခက်စေပါတယ်။

### ပိုကောင်းသောနည်း

Position ကို child ကို margin အကြီးကြီးပေးပြီး မရွှေ့ပါနဲ့။ Parent layout က တာဝန်ယူပါစေ:

```css
.search-layout {
  display: grid;
  grid-template-columns: minmax(240px, 320px) minmax(0, 1fr);
  gap: 1rem;
  padding: 1rem;
}

.property-map {
  width: 100%;
  min-height: 500px;
}

@media (max-width: 768px) {
  .search-layout {
    grid-template-columns: 1fr;
  }
}
```

Map ရဲ့ inline style ကိုလျှော့ပြီး class သုံးပါ:

```jsx
<MapContainer
  className="property-map"
  center={defaultCenter}
  zoom={12}
>
```

Navbar ရဲ့ `gap: 300px` အစား:

```css
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
```

သုံးပါ။ Fixed navbar ဆက်သုံးမယ်ဆိုရင် `z-index` နဲ့ page content ရဲ့ top spacing ကိုလည်း မှန်အောင်လုပ်ရပါမယ်။

---

## 4. Form Accessibility ကို ပြင်သင့်ပါသည်

### Radio buttons

Location နဲ့ Station radio နှစ်ခုမှာ တူညီတဲ့ `name` မရှိတာကြောင့် နှစ်ခုလုံးကို တစ်ပြိုင်နက် select လုပ်နိုင်ပါတယ်။

အောက်ပါပုံစံသုံးပါ:

```jsx
<fieldset>
  <legend>Search by</legend>

  <label>
    <input
      type="radio"
      name="searchBy"
      value="location"
      checked={filters.searchBy === "location"}
      onChange={handleSearchModeChange}
    />
    Location
  </label>

  <label>
    <input
      type="radio"
      name="searchBy"
      value="station"
      checked={filters.searchBy === "station"}
      onChange={handleSearchModeChange}
    />
    Station
  </label>
</fieldset>
```

### Checkbox labels

Checkbox တိုင်းကို `<label>` နဲ့ ချိတ်ပါ:

```jsx
<label>
  <input type="checkbox" value="apartment" />
  Apartment
</label>
```

ဒါက စာသားကိုနှိပ်လည်း checkbox ရွေးနိုင်စေပြီး screen reader သုံးသူတွေအတွက် ပိုကောင်းပါတယ်။

### Button နှင့် Link

- Page တစ်ခုသို့ သွားတာဆိုရင် link သုံးပါ။
- Action တစ်ခုလုပ်တာဆိုရင် button သုံးပါ။

`Save Search` က action ဖြစ်လို့ `div` အစား:

```jsx
<button type="button" onClick={handleSaveSearch}>
  Save Search
</button>
```

သုံးသင့်ပါတယ်။

`href="#"` က page ကို အပေါ်ပြန်ခုန်စေနိုင်ပါတယ်။ တကယ်သွားမယ့် route ရှိရင် link သုံးပါ။ List ချဲ့ပြတာဆိုရင် button သုံးပါ။

---

## 5. Navigation Styling ကို ပြင်သင့်ပါသည်

CSS ထဲမှာ:

```css
Link {
  /* styles */
}
```

လို့ရေးထားပါတယ်။ React Router ရဲ့ `Link` က browser ထဲမှာ `<a>` အဖြစ် render လုပ်တာကြောင့် ဒီ CSS selector က အလုပ်မလုပ်ပါ။

Class သုံးပါ:

```jsx
<Link className="nav-link" to="/">
  Home
</Link>
```

```css
.nav-link {
  color: white;
  text-decoration: none;
  border-bottom: 2px solid transparent;
}
```

လက်ရှိ page ကို active ပြချင်ရင် `Link` အစား `NavLink` သုံးပါ:

```jsx
<NavLink
  to="/saved"
  className={({ isActive }) =>
    isActive ? "nav-link nav-link--active" : "nav-link"
  }
>
  Saved
</NavLink>
```

Route path တွေကို lowercase နဲ့ consistent ဖြစ်အောင်ထားပါ:

```text
/
/search
/saved
```

Unknown URL အတွက် not-found route လည်း ထည့်ပါ:

```jsx
<Route path="*" element={<NotFound />} />
```

---

## 6. Map ကို Data-driven Component ဖြစ်အောင်လုပ်သင့်ပါသည်

လက်ရှိ map က:

- Tokyo ကိုပဲ center ထားတယ်။
- Tokyo marker တစ်ခုပဲပြတယ်။
- Search filters ပြောင်းလည်း map မပြောင်းဘူး။

Page က data ကိုဆုံးဖြတ်ပြီး map က ပြပေးရုံဖြစ်သင့်ပါတယ်:

```jsx
function PropertyMap({ center, zoom = 12, properties }) {
  return (
    <MapContainer center={center} zoom={zoom} className="property-map">
      <TileLayer /* tile settings */ />

      {properties.map((property) => (
        <Marker
          key={property.id}
          position={[property.latitude, property.longitude]}
        >
          <Popup>{property.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
```

Search result ပြောင်းတဲ့အခါ map center ကိုပါ ရွှေ့ချင်ရင် React Leaflet ရဲ့ `useMap()` နဲ့ `map.setView(center, zoom)` ကို သုံးဖို့လိုနိုင်ပါတယ်။

Map နဲ့ search အတွက် ဒီ state တွေလည်း စဉ်းစားထားပါ:

- Loading
- No results
- API error
- Invalid coordinates
- Tile service error

User ကို ဘာဖြစ်နေလဲ အမြဲသိစေသင့်ပါတယ်။

---

## 7. Starter CSS နှင့် မသုံးသော Code ကို ရှင်းသင့်ပါသည်

`src/index.css` နဲ့ `src/App.css` ထဲမှာ Vite starter template က CSS အများကြီး ကျန်နေပါတယ်။ Project မှာ မသုံးတဲ့ hero, docs နဲ့ next-step styles တွေကို စစ်ပြီး ဖယ်ရှားသင့်ပါတယ်။

`index.css` ထဲမှာ အဓိကအားဖြင့်:

- Design tokens
- Base/reset styles
- Typography
- `body` နဲ့ `#root` defaults

လောက်သာထားပြီး feature-specific CSS ကို သက်ဆိုင်ရာ component နားမှာထားတာ ပိုကောင်းပါတယ်။

`color-scheme: light dark` သုံးထားပေမယ့် application တစ်ခုလုံးအတွက် dark mode ကို မပြင်ဆင်ရသေးပါ။ Theme နှစ်ခုလုံးကို စနစ်တကျလုပ်မလား၊ လောလောဆယ် light theme တစ်ခုတည်းထားမလား ဆုံးဖြတ်သင့်ပါတယ်။

---

## 8. Dependency များကို ပြန်သုံးသပ်သင့်ပါသည်

Project ထဲမှာ ဆင်တူတာဝန်ရှိတဲ့ သို့မဟုတ် လက်ရှိမသုံးသေးတဲ့ package တွေရှိနိုင်ပါတယ်:

- Emotion
- Styled Components
- MUI Styled Components engine
- Google Maps API
- Leaflet နှင့် React Leaflet
- `react-router` နှင့် `react-router-dom`

Package များလွန်းရင် install အချိန်၊ maintenance နဲ့ bundle size တိုးပါတယ်။ Concern တစ်ခုအတွက် approach တစ်ခုရွေးပါ:

- Leaflet သို့မဟုတ် Google Maps
- Plain CSS, Emotion/MUI သို့မဟုတ် Styled Components
- Browser app routing အတွက် `react-router-dom`

Package ကို မဖယ်ခင် project တစ်ခုလုံးမှာ သုံးထားခြင်းရှိမရှိ အရင်ရှာပါ။ ပြီးမှ:

```bash
npm uninstall package-name
```

လုပ်ပြီး lint, test နဲ့ build ပြန်စစ်ပါ။

---

## 9. Automated Tests ထည့်သင့်ပါသည်

လက်ရှိ automated test မရှိသေးပါ။ အကြံပြု tools:

- Vitest
- React Testing Library
- `@testing-library/user-event`

အစမှာ အောက်ပါ behavior တွေကို test ရေးပါ:

1. Home, Search နဲ့ Saved routes render ဖြစ်သည်။
2. Active navigation link မှန်ကန်စွာ ပြသည်။
3. Station ပြောင်းလျှင် form state update ဖြစ်သည်။
4. Location နဲ့ Station နှစ်ခုလုံး တစ်ပြိုင်နက် မရွေးနိုင်။
5. Valid filter submit လုပ်လျှင် search function ခေါ်သည်။
6. Required filter မရှိလျှင် အသုံးဝင်သော error ပြသည်။
7. Search result အတိုင်း map markers ပြသည်။
8. Save Search က selected filters ကို သိမ်းသည်။
9. မရှိသော route အတွက် Not Found page ပြသည်။

Implementation detail ကို test မရေးဘဲ user က ဘာမြင်ပြီး ဘာလုပ်နိုင်သလဲဆိုတာကို test ရေးပါ။

---

## 10. README ကို Project အကြောင်းအရာနဲ့ ပြန်ရေးသင့်ပါသည်

လက်ရှိ README က Vite default template ဖြစ်နေပါတယ်။ အောက်ပါအချက်တွေ ပါသင့်ပါတယ်:

- Application က ဘာလုပ်ပေးသလဲ
- Project ရဲ့ လက်ရှိအဆင့်
- Supported Node.js version
- Install နှင့် run commands
- Lint, test နှင့် build commands
- Environment variables
- Folder structure
- Map/tile provider
- Backend/API လိုအပ်ချက်
- Deployment လုပ်နည်း

Developer အသစ်တစ်ယောက် repository ကို clone လုပ်ပြီး မေးခွန်းမေးစရာမလိုဘဲ run နိုင်တာက README ကောင်းတစ်ခုရဲ့ ရည်ရွယ်ချက်ပါ။

---

## Build Warning

Production build အောင်မြင်ပေမယ့် JavaScript bundle က 500 kB ကျော်လို့ Vite warning တက်ပါတယ်။ လက်ရှိ prototype အတွက် run မရအောင်ပိတ်ထားတဲ့ error မဟုတ်ပါ။ ဒါပေမယ့် project ကြီးလာရင် route-level lazy loading သုံးသင့်ပါတယ်:

```jsx
const SearchFilter = lazy(() => import("./pages/seeker/SearchFilter"));
```

ပြီးရင် `Suspense` fallback ထည့်ပါ။ မသုံးတဲ့ package တွေကို ဖယ်ရှားတာကလည်း bundle size လျော့စေပါတယ်။

---

## အဆင့်လိုက်လုပ်သင့်သော Milestones

### Milestone 1 — Foundation

- Import နာမည်နှင့် file naming ကို consistent လုပ်ပါ။
- Lockfile ကို အမြဲ sync ထားပါ။
- Vite starter code မသုံးတာတွေ ရှင်းပါ။
- README ပြန်ရေးပါ။
- Not Found route ထည့်ပါ။

### Milestone 2 — Functional Search

- Controlled filter state ထည့်ပါ။
- Radio နဲ့ checkbox behavior မှန်အောင်လုပ်ပါ။
- Form validation ထည့်ပါ။
- Mock data သို့မဟုတ် API ချိတ်ပါ။
- Property result list နဲ့ map markers ပြပါ။
- Save Search ကို တကယ်အလုပ်လုပ်အောင်လုပ်ပါ။

### Milestone 3 — Responsive and Accessible UI

- Fixed margins အစား Grid/Flexbox သုံးပါ။
- Mobile layout ထည့်ပါ။
- Semantic labels, fieldsets, buttons နဲ့ links သုံးပါ။
- Loading, empty, error, hover နဲ့ focus states ထည့်ပါ။

### Milestone 4 — Quality Protection

- Interaction tests ထည့်ပါ။
- CI မှာ `npm ci`, lint, test နဲ့ build run ပါ။
- Bundle size ပြန်စစ်ပါ။
- မသုံးသော dependencies ဖယ်ရှားပါ။

---

## Feature တစ်ခု “ပြီးပြီ” ဟု သတ်မှတ်ရန် Checklist

Feature တစ်ခုစီအတွက်:

- Normal use case အလုပ်လုပ်သလား။
- Invalid input ကို handle လုပ်ထားသလား။
- Loading, empty နဲ့ error states ရှိသလား။
- Keyboard တစ်ခုတည်းနဲ့ သုံးနိုင်သလား။
- Mobile နဲ့ desktop နှစ်ခုလုံးမှာ အဆင်ပြေသလား။
- အရေးကြီး behavior တွေအတွက် tests ရှိသလား။
- Lint နဲ့ build pass သလား။
- Browser console မှာ မမျှော်လင့်ထားသော error ရှိသလား။
- Documentation လိုအပ်ရင် update လုပ်ထားသလား။

## နောက်ဆုံးအကြံပြုချက်

အခုအချိန်မှာ empty page အသစ်တွေ ထပ်တိုးတာထက် feature တစ်ခုကို အစမှအဆုံးပြီးအောင်လုပ်တာ ပိုကောင်းပါတယ်:

```text
Filter ရွေးခြင်း
→ Form submit
→ Validation
→ Results ပြခြင်း
→ Map update
→ Search သိမ်းခြင်း
```

ဒီ flow တစ်ခုလုံး အလုပ်လုပ်သွားတဲ့အခါ component ဘယ်လိုခွဲရမယ်၊ data shape ဘယ်လိုထားရမယ်နဲ့ backend API ဘာလိုမယ်ဆိုတာ ပိုရှင်းလာပါမယ်။

Shared state ကို parent component မှာထားပါ။ Child component တွေကို props နဲ့ data ပေးပါ။ Layout ကို fixed margin အကြီးကြီးနဲ့ မရွှေ့ပါနဲ့။ Feature တစ်ခုပြီးတိုင်း lint, tests နဲ့ build ကို ချက်ချင်းပြန်စစ်တဲ့အကျင့်ထားပါ။
