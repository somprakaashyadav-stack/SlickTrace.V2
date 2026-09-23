# 🌊 SLICKTRACE V2 — Comprehensive Technical Documentation & Operator Manual

---

## 📑 Table of Contents
1. [Executive Summary & Mission](#1-executive-summary--mission)
2. [End-to-End System Architecture](#2-end-to-end-system-architecture)
3. [Complete Button & UI Control Directory (Every Option Explained)](#3-complete-button--ui-control-directory)
   - [3.1 Top Navigation Bar](#31-top-navigation-bar)
   - [3.2 Top 4 Interactive KPI Metric Cards](#32-top-4-interactive-kpi-metric-cards)
   - [3.3 Left Satellite & Drift Controls Panel](#33-left-satellite--drift-controls-panel)
   - [3.4 Interactive GIS Nautical Map Controls](#34-interactive-gis-nautical-map-controls)
   - [3.5 Suspect Vessel Attribution Leaderboard](#35-suspect-vessel-attribution-leaderboard)
   - [3.6 4D Spatio-Temporal Timeline Scrubber HUD](#36-4d-spatio-temporal-timeline-scrubber-hud)
   - [3.7 Dedicated Console Pages (Detection, Drift, Attribution, Reports)](#37-dedicated-console-pages)
   - [3.8 Profile Settings & API Key Registry](#38-profile-settings--api-key-registry)
4. [AI Models & Deep Learning Architectures](#4-ai-models--deep-learning-architectures)
5. [Physics & Hydrodynamic Modeling Engines](#5-physics--hydrodynamic-modeling-engines)
6. [Satellite Observations & Data Ingestion APIs](#6-satellite-observations--data-ingestion-apis)
7. [Database & Spatial GIS Engine](#7-database--spatial-gis-engine)
8. [Multi-Stakeholder Legal & Law Enforcement Hub](#8-multi-stakeholder-legal--law-enforcement-hub)

---

## 1. Executive Summary & Mission

**SlickTrace V2** is an automated satellite AI, hydrodynamic physics, and maritime forensics platform specifically tailored for the **Indian Exclusive Economic Zone (EEZ)** and global maritime corridors. 

It solves the critical problem of **illegal oil discharges at sea** (such as oily bilge dumping, tank washing, and pipeline leaks) by bridging raw satellite radar observations with maritime ship transponder (AIS) records to:
1. Automatically detect and segment dark-spot oil slicks in C-band Synthetic Aperture Radar (SAR) and optical imagery.
2. Filter out false-positive natural look-alikes (algae, biogenic slicks, low-wind calm water).
3. Backtrack the oil spill in reverse time ($t_{\text{detection}} \rightarrow t_0$) using INCOIS high-resolution ocean current vectors and NCMRWF atmospheric winds.
4. Correlate candidate vessel historical trajectories, identifying speed anomalies (slow-steaming during illicit de-ballasting) and deliberate AIS transponder blackouts.
5. Autonomously compile court-admissible forensic evidence dossiers sealed with SHA-256 cryptographic hashes for the **Indian Coast Guard (ICG)**, **Directorate General of Shipping (DGS)**, Environmental Agencies, and **Admiralty Courts** (under Part XIA of the Indian Merchant Shipping Act 1958).

---

## 2. End-to-End System Architecture

```
 ┌─────────────────────────────────────────────────────────────────────────────────────────────┐
 │                                   SLICKTRACE V2 ARCHITECTURE                                │
 ├─────────────────────────────────────────────────────────────────────────────────────────────┤
 │  🛰️ DATA INGESTION                                                                          │
 │     • ISRO EOS-04 (RISAT-1A C-Band SAR) & Oceansat-3 (OCM-3) Optical                       │
 │     • Copernicus Sentinel-1A/B SAR (IW Level-1 GRD) & Sentinel-2 MSI Optical               │
 │     • Marine AIS: DGLL National AIS, MarineTraffic, Global Fishing Watch                    │
 │     • Metocean: INCOIS ROMS Ocean Currents, NCMRWF Wind Fields, ERA5 Reanalysis             │
 ├─────────────────────────────────────────────────────────────────────────────────────────────┤
 │  🧠 CORE ANALYTICS & AI ENGINE (Python 3.11 + PyTorch + OpenDrift)                          │
 │     • OilSpillNet U-Net / DeepLabV3+: Dark-spot segmentation ($10\text{m}$ resolution)      │
 │     • Misash CNN Look-Alike Discriminator: Polarimetric ratio $VV/VH$ filtering             │
 │     • Bonn Agreement BAOAC Engine: Sheen vs. Thick mineral crude classification             │
 │     • OpenDrift OpenOil Engine: Reverse 4D Lagrangian advection + Fay spreading             │
 │     • XGBoost Culprit Classifier: Multi-factor AIS anomaly & CPA attribution scoring        │
 ├─────────────────────────────────────────────────────────────────────────────────────────────┤
 │  🗄️ BACKEND & SPATIAL INFRASTRUCTURE                                                        │
 │     • FastAPI Microservices Architecture with CORS & Rate Limiting                          │
 │     • DuckDB In-Memory Columnar Database + PostgreSQL PostGIS Spatial Querying              │
 │     • Multi-Stage Docker Container Stack & Cloud GPU Acceleration                           │
 ├─────────────────────────────────────────────────────────────────────────────────────────────┤
 │  💻 FRONTEND & GIS INTERACTIVE UI                                                           │
 │     • React 19 + TypeScript + Vite + Tailwind CSS v4                                        │
 │     • Leaflet Maps & Mapbox GL Engine with Bathymetry & OpenSeaMap Nautical Seamarks        │
 │     • 4D Timeline Scrubber HUD with synchronized Lagrangian hindcast replay                 │
 │     • 4-Stakeholder Output Hub (Authorities, Environment, Public Media, Admiralty Courts)   │
 └─────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Complete Button & UI Control Directory

### 3.1 Top Navigation Bar

| Element / Button | Type | Purpose & Behavior |
| :--- | :--- | :--- |
| **`SLICKTRACE V2` Logo** | Brand Header | Displays application branding and version. Clicking returns to the primary Dashboard. |
| **`Active Maritime Incident Dropdown`** | Dropdown Selector | Allows instant switching between pre-seeded high-fidelity Indian EEZ scenarios: <br>• **`Arabian Sea — Mumbai High EEZ (India)`** ($19.42^\circ\text{N}, 71.32^\circ\text{E}$)<br>• **`Gulf of Kutch — Gujarat Maritime EEZ`** ($22.48^\circ\text{N}, 69.38^\circ\text{E}$)<br>• **`Bay of Bengal — Andaman & Nicobar SLOC`** ($6.82^\circ\text{N}, 93.52^\circ\text{E}$). |
| **`DuckDB Online` Badge** | Status Indicator / Link | Shows live connection status to the backend. Clicking opens the FastAPI interactive Swagger API Documentation (`/docs`). |
| **`Dashboard` Tab** | Page Nav Button | Switches to the primary unified GIS tactical intelligence dashboard. |
| **`Satellite Detection` Tab** | Page Nav Button | Switches to the deep radar processing, speckle filtering, and AI U-Net segmentation console. |
| **`Drift Simulator` Tab** | Page Nav Button | Switches to the 4D Lagrangian hydrodynamic advection & weathering modeling console. |
| **`AIS Attribution` Tab** | Page Nav Button | Switches to the spatio-temporal vessel trajectory matrix, speed anomaly chart, and blackout forensics. |
| **`Reports` Tab** | Page Nav Button | Switches to the Multi-Stakeholder Evidence Hub with printable dossiers and JSON exports. |
| **`Theme Toggle (Sun/Moon)`** | Toggle Button | Switches between Light Theme and Tactical Dark Ocean Mode. |
| **`Profile` Button** | Modal Trigger | Opens the Agency Credentials and Maps & Satellite API Key Registry. |

---

### 3.2 Top 4 Interactive KPI Metric Cards

*(Note: Clicking any of these cards opens an interactive telemetry detail modal.)*

| KPI Card | Metric Displayed | Click Popover Contents |
| :--- | :--- | :--- |
| **1. Active Oil Slicks** | Number of active slicks & total area ($48.3\text{ km}^2$) | Displays slick volume ($1,250\text{ m}^3 / 7,862\text{ bbls}$), mean film thickness ($25.8\ \mu\text{m}$), Bonn BAOAC Code 4 status, and Fay spreading dynamics. |
| **2. Satellite Passes** | Satellite orbit pass identifier (#142 IW Dual-Pol) | Shows SAR radar mode ($VV+VH$), $10\text{m}$ spatial resolution, radiometric calibration factor ($-83.2\text{ dB}$), and Refined Lee speckle filter index ($0.942$). |
| **3. Drift Prediction Accuracy** | Hydrodynamic model confidence score ($82.9\% - 98.4\%$) | Shows INCOIS ROMS surface current speed ($0.85\text{ kn}$ SE), NCMRWF atmospheric wind ($14.2\text{ kn}$ NW), and leeway wind drift factor ($3.2\%$). |
| **4. Suspect Vessels Identified** | Number of tracked vessels & total AIS pings ($3,217$) | Displays candidate vessels evaluated, attribution ranking confidence, and closest point of approach ($626\text{ m}$). |

---

### 3.3 Left Satellite & Drift Controls Panel

| Control / Button | Type | Technical Function |
| :--- | :--- | :--- |
| **`Satellite Source & Modality`** | Dropdown Selector | Chooses the active satellite sensor: <br>• `ISRO EOS-04 (RISAT-1A SAR)`: C-Band Dual-Pol radar.<br>• `ISRO Oceansat-3 (OCM-3)`: Optical Ocean Color Monitor.<br>• `Sentinel-1 SAR (IW C-Band)`: Copernicus SAR.<br>• `Sentinel-2 MSI Optical`: High-res optical sun-glint & NDWI.<br>• `Landsat-9 OLI`: Thermal Infrared (TIRS).<br>• `RADARSAT Constellation`: Compact polarimetry. |
| **`Acquisition Timestamp`** | Date/Time Picker | Displays satellite imagery capture timestamp ($2024-11-25\ 22:30\text{ UTC}$). |
| **`Time Presets` (`T0`, `T-6h`, `t₀ Origin`, `T-24h`)** | Quick Buttons | Instantly scrubs the 4D timeline to key historical milestones: detection, mid-drift, discharge origin, and initial transponder ping. |
| **`Select Sector / Maritime Zone`** | Slider ($1 - 10$) | Adjusts the active EEZ surveillance corridor radius. |
| **`Hydrodynamic Model Formulation`** | Dropdown Selector | Selects the physics solver: <br>• `Lagrangian Model (OpenDrift OpenOil + Stokes)`<br>• `Eulerian Advection-Diffusion Grid`<br>• `Fay Viscous-Surface Tension Model`. |
| **`AI Detection Confidence`** | Slider ($50\% - 99\%$) | Adjusts the sigmoid threshold for U-Net binary mask segmentation. |
| **`Misasah CNN Look-Alike Suppression`** | Checkbox | Activates polarimetric ratio ($VV/VH$) filtering to reject false alarms caused by biogenic films, algae blooms, and low wind calm water. |
| **`Run Comprehensive AI Analysis`** | Action Button | Executes the full 8-step pipeline, re-computing radar segmentation, drift hindcast, and vessel attribution scores. |

---

### 3.4 Interactive GIS Nautical Map Controls

| Map Tool / Control | Location | Technical Function |
| :--- | :--- | :--- |
| **`Layer Switcher`** | Top-Right of Map | Opens basemap menu: <br>• **Satellite Hybrid**: Esri World Imagery + high-res optical.<br>• **Dark Tactical Ocean**: Esri Dark Canvas for nighttime ops.<br>• **Maritime Nautical Chart**: Esri Bathymetry + OpenSeaMap Seamarks.<br>• **Bathymetry & Topo**: Topographic & seabed relief. |
| **`Measure Tool (Ruler)`** | Map Toolbar | Allows clicking two points on the map to calculate real-world nautical distance in kilometers and nautical miles. |
| **`Fullscreen Toggle`** | Map Toolbar | Expands the interactive GIS map to 100% viewport width and height. |
| **`Zoom In / Out (+ / -)`** | Map Toolbar | Increases or decreases map zoom level. |
| **`Compass / Reset North`** | Map Toolbar | Resets map rotation to true geographic North. |
| **`Oil Slick Polygon (Red Area)`** | Map Canvas | Clicking opens the spill attributes popup (Area, Bonn Code, Volume, Confidence, Sensor). |
| **`SAR Radar Swath (Cyan / Emerald)`**| Map Canvas | Renders the real-time satellite sensor footprint and polarimetric swath boundary. |
| **`Origin Marker (t₀ ORIGIN)`** | Map Canvas | Highlights the calculated discharge GPS coordinate ($19.52^\circ\text{N}, 71.18^\circ\text{E}$) from reverse Lagrangian hindcast. |
| **`Ship Track Polylines`** | Map Canvas | Visualizes historical AIS vessel tracks with color-coded speed profiles and blackout gaps. |

---

### 3.5 Suspect Vessel Attribution Leaderboard

| Control / Element | Purpose & Behavior |
| :--- | :--- |
| **`Vessel List Rows`** | Displays candidate ships ranked by composite risk score. Culprits are highlighted with red warning badges (e.g., `MT Sagar Ratna` — 94.2% match). |
| **`Past Trajectory Sparkline`** | Inline SVG chart showing vessel speed history over the 36-hour surveillance window. |
| **`Audit Forensics Button`** | Clicking opens the **Vessel Forensic Profile Modal**, displaying: <br>• Full IMO, MMSI, Call Sign, Flag, Draught, Destination.<br>• Detailed Speed Drop Graph ($14.6\text{ kn} \rightarrow 2.3\text{ kn}$).<br>• AIS Transponder Blackout Audit ($45\text{ minutes}$ dark ship operation). |

---

### 3.6 4D Spatio-Temporal Timeline Scrubber HUD

| Control / Element | Purpose & Behavior |
| :--- | :--- |
| **`Play / Pause Button`** | Starts or pauses the synchronized 4D temporal animation. |
| **`Step Forward / Backward`** | Steps through the incident timeline in 2-hour increments. |
| **`Playback Speed (1x, 2x, 5x)`** | Multiplies playback speed for quick scenario demonstrations. |
| **`Scrubber Progress Slider`** | Draggable slider that moves time from **`-34h (Origin)`** $\rightarrow$ **`0h (Detection)`** $\rightarrow$ **`+36h (Shore Landfall Threat)`**, updating slick position, diffusion uncertainty rings, and vessel tracks simultaneously on the map. |

---

### 3.7 Dedicated Console Pages

* **`Satellite Detection Page`**: Contains deep radar calibration controls, speckle filter kernel selection ($3\times3$, $5\times5$), manual SAR image upload, and **Emergency Alert Dispatch** to Coast Guard command.
* **`Drift Simulator Page`**: Provides live meteorological sliders for wind speed, current speed, wind direction, leeway factor, alongside NOAA PyGNOME weathering graphs (evaporation %, emulsification %, dynamic viscosity cP).
* **`AIS Attribution Page`**: Dedicated ship filtering console by vessel category (Crude Tanker, Chemical Carrier, Bulk Carrier, Cargo, Patrol), spatial search radius ($5 - 50\text{ km}$), temporal search window ($1 - 12\text{ hours}$), and CSV export.
* **`Reports Page`**: Multi-Stakeholder Operational Hub rendering 4 tailored mission dossiers:
  1. **Authorities Console**: Indian Coast Guard Interception Directive dispatching `ICGS SAMRAT (OPV-02)` with statutory boarding checklists.
  2. **Environment Agencies Console**: Containment boom geometry ($4,500\text{ m}$ J-configuration perimeter) and skimmer assignments.
  3. **Public / Media Console**: Official safety advisory and Indian Coast Guard Emergency Hotline **1554**.
  4. **Insurance / Legal Console**: Admiralty Court Evidence Affidavit under **Part XIA of the Indian Merchant Shipping Act 1958** with SHA-256 cryptographic custody seals and ₹124.50 Crores statutory damage claims.

---

### 3.8 Profile Settings & API Key Registry

Clicking the **Profile** button in the top navbar opens the API Key Registry modal, enabling operators to connect live production API keys:
* **ESA Copernicus Data Space Ecosystem** (Client ID & Secret for Sentinel-1/2)
* **NASA Earthdata Login** (MODIS & Landsat-9)
* **Sentinel Hub API Key**
* **Mapbox GL Access Token**
* **OpenWeatherMap / ERA5 Marine API Key**
*(All keys are securely persisted in encrypted local storage with one-click export/import).*

---

## 4. AI Models & Deep Learning Architectures

### 4.1 PyTorch U-Net Dark-Spot Segmentation Model
* **Architecture**: 4-level contracting encoder + bottleneck ($1,024\text{ filters}$) + 4-level expansive decoder with skip connections.
* **Input Tensor**: $(B, 2, 256, 256)$ representing dual-polarization $VV$ (Co-polarization) and $VH$ (Cross-polarization) SAR channels.
* **Loss Function**: Combined Binary Cross-Entropy + Dice Loss:
  $$\mathcal{L}_{\text{total}} = \mathcal{L}_{\text{BCE}} + (1 - \text{Dice}(\hat{y}, y))$$
* **Published Performance**: $F_1\text{-Score}: 0.881$, $\text{IoU (Jaccard)}: 0.788$, $\text{Precision}: 87.2\%$, $\text{Recall}: 89.1\%$.

### 4.2 Misash CNN Look-Alike Discriminator
* **Input Feature Vector**: $[\sigma^0_{VV}, \sigma^0_{VH}, \text{Polarization Ratio } (VV/VH), \text{Wind Speed } u_{10}]$.
* **Physics Logic**: True mineral crude oil strongly dampens capillary waves in $VV$ polarization ($\sigma^0_{VV} \in [-25, -15]\text{ dB}$) with polarization ratio $VV/VH < -2.0\text{ dB}$. Biogenic films and low-wind shadows have $VV/VH > 0\text{ dB}$ and are automatically suppressed.

### 4.3 XGBoost Multi-Criteria Culprit Ranking Model
* **Features**:
  1. Closest Point of Approach ($\text{CPA}_{\text{km}}$): Exponential decay $S_{\text{prox}} = 100 \cdot e^{-\text{CPA} / 5.0}$.
  2. Temporal Coincidence ($\Delta t$ to $t_0$): Proximity to estimated release window.
  3. Vessel Risk Weight ($W_{\text{type}}$): Crude Tanker ($100$), Chemical ($85$), Bulk Carrier ($60$), Container ($50$).
  4. Behavioral Speed Anomaly ($S_{\text{speed}}$): Deceleration $>3\text{ kn}$ in offshore fairway ($92.0$).
  5. AIS Integrity Anomaly ($S_{\text{AIS}}$): Transponder blackout during transit ($91.5$).
* **Composite Attribution Formula**:
  $$\text{Risk Score} = 0.30 \cdot S_{\text{prox}} + 0.25 \cdot S_{\text{time}} + 0.15 \cdot W_{\text{type}} + 0.15 \cdot S_{\text{speed}} + 0.15 \cdot S_{\text{AIS}}$$

---

## 5. Physics & Hydrodynamic Modeling Engines

### 5.1 OpenDrift / OpenOil Lagrangian Advection
* **Advection Formula**:
  $$\vec{V}_{\text{drift}} = \vec{u}_{\text{ocean}}(x,y,t) + \alpha \cdot \vec{u}_{\text{wind}}(x,y,t) + \vec{u}_{\text{Stokes}}$$
  * $\alpha = 0.032$ ($3.2\%$ leeway wind drift coefficient).
  * $\vec{u}_{\text{Stokes}} = 0.016 \cdot \vec{u}_{\text{wind}}$ (Stokes drift wave transport).
  * Ekman Coriolis surface deflection: $10^\circ$ right of wind in Northern Hemisphere.

### 5.2 NOAA PyGNOME Oil Weathering Equations
* **Evaporation Loss**: $F_{\text{evap}}(t) = 0.052 + 0.047 \cdot \ln(t_{\text{hours}})$.
* **Water Emulsification**: $\frac{dY}{dt} = K_{\text{em}} \cdot (1 - Y)^2 \cdot u_{\text{wind}}^2$ (Max water content $Y_{\text{max}} = 42\%$).
* **Viscosity Increase**: $\eta(t) = \eta_0 \cdot e^{5.0 \cdot F_{\text{evap}} + 2.5 \cdot Y_{\text{water}}}$.

### 5.3 Bonn Agreement (BAOAC) Classification
* **BAOAC 1**: Sheen ($0.04 - 0.30\ \mu\text{m}$)
* **BAOAC 2**: Rainbow ($0.30 - 5.0\ \mu\text{m}$)
* **BAOAC 3**: Metallic ($5.0 - 50.0\ \mu\text{m}$)
* **BAOAC 4**: Discontinuous True Color ($50 - 200\ \mu\text{m}$)
* **BAOAC 5**: Continuous True Color ($>200\ \mu\text{m}$)

---

## 6. Satellite Observations & Data Ingestion APIs

| Satellite Sensor | Modality | Resolution | Spectral Bands / Pol | Primary Application |
| :--- | :--- | :--- | :--- | :--- |
| **ISRO EOS-04 (RISAT-1A)** | C-Band SAR | $10\text{ m}$ | $VV + VH$ Dual-Pol | All-weather day/night radar detection in Indian EEZ. |
| **ISRO Oceansat-3 (OCM-3)**| Optical Multi-Spectral | $360\text{ m} / 10\text{ m}$ | 13 Spectral Bands | Chlorophyll-a, ocean color, and coastal water validation. |
| **Copernicus Sentinel-1** | C-Band SAR (IW Mode) | $10\text{ m}$ | $VV + VH$ GRD | Capillary wave dampening and slick polygon extraction. |
| **Copernicus Sentinel-2** | Optical MSI | $10\text{ m}$ | Bands 2, 3, 4, 8A | Sun-glint reflectance & NDWI water indexing. |
| **Landsat-9 OLI / TIRS** | Thermal IR | $30\text{ m} / 100\text{ m}$ | Bands 10, 11 | Thermal contrast between thick oil emulsion and seawater. |

---

## 7. Database & Spatial GIS Engine

* **DuckDB Columnar Analytical Engine**: Embedded spatial analytical engine capable of processing $500,000+$ historical AIS points in $<50\text{ ms}$ with zero server overhead (`data/slicktrace.duckdb`).
* **PostgreSQL + PostGIS**: Enterprise spatial geometry database storing georeferenced satellite swaths, spill polygons, and maritime boundary shapefiles (`EPSG:4326 WGS84`).
* **GDAL / GEOS**: High-precision geometric union, polygon buffer, and Shoelace area calculations.

---

## 8. Multi-Stakeholder Legal & Law Enforcement Hub

```
 ┌─────────────────────────────────────────────────────────────────────────────────────────────┐
 │                         MULTI-STAKEHOLDER OPERATIONAL ENDPOINTS                             │
 ├──────────────────────────────┬──────────────────────────────────────────────────────────────┤
 │ Stakeholder Branch           │ Concrete Deliverable & Legal Basis                           │
 ├──────────────────────────────┼──────────────────────────────────────────────────────────────┤
 │ 🛡️ Indian Coast Guard (ICG)  │ Official Interception & Detention Directive (ICGS SAMRAT)    │
 │    & Port State Control      │ Legal Basis: Indian Merchant Shipping Act 1958 (Part XIA)   │
 ├──────────────────────────────┼──────────────────────────────────────────────────────────────┤
 │ 🌿 Environmental Clean-up    │ Tactical 4,500m J-Configuration Booming Coordinates &        │
 │    Agencies (INCOIS / SPCB)  │ Skimmer Vessel Dispatch (NOS-DCP Tier 2 Protocol)            │
 ├──────────────────────────────┼──────────────────────────────────────────────────────────────┤
 │ 📢 Public & Media Bureau     │ Transparent Citizen Safety Bulletin & Marine Hotline (1554)  │
 ├──────────────────────────────┼──────────────────────────────────────────────────────────────┤
 │ ⚖️ Admiralty Courts &        │ SHA-256 Cryptographically Sealed Evidence Affidavit &        │
 │    P&I Club Insurance        │ ₹124.50 Crores ($14.85M USD) Statutory Damage Claim          │
 └──────────────────────────────┴──────────────────────────────────────────────────────────────┘
```

* **Cryptographic Verification**: Every generated report embeds a computed `SHA-256` signature over the incident metadata, vessel particulars, and origin coordinates to satisfy legal requirements for digital evidence under the **Indian Evidence Act (§ 65B)** and the **International Tribunal for the Law of the Sea (ITLOS)**.
