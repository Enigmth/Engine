const normalizeDescription = description =>
    (description || '').replace(/\s+/g, ' ').trim();

const buildSolutionFromDescription = description => {
  const summary = normalizeDescription(description);
  if (!summary) {
    return 'Kontrollo sistemin përkatës dhe drejtohu në servis nëse paralajmërimi vazhdon.';
  }
  const text = summary.toLowerCase();

  if (/temperatur|ftoh|radiator|ventilator|mbinxeh/.test(text)) {
    return 'Ndal automjetin në mënyrë të sigurt dhe lëre motorin të ftohet. Kontrollo ftohësin dhe rrjedhjet. Mos vazhdo vozitjen nëse drita mbetet ndezur.';
  }
  if (/bateri|alternator|karik|charging|charge/.test(text)) {
    return 'Fik pajisjet jo thelbësore elektrike. Kontrollo terminalet e baterisë dhe sistemin e karikimit. Bëj kontroll në servis sa më shpejt.';
  }
  if (/vaj|lubrifik/.test(text)) {
    return 'Fike motorin menjëherë dhe kontrollo nivelin e vajit. Shto vaj nëse duhet. Mos e ngas makinën nëse drita vazhdon.';
  }
  if (/fren|abs|hidraulik|jastëk/.test(text)) {
    return 'Kontrollo fillimisht frenën e dorës dhe nivelin e lëngut të frenave. Nëse problemi vazhdon, bëj kontroll të sistemit të frenimit.';
  }
  if (/gom|presion/.test(text)) {
    return 'Kontrollo presionin e të gjitha gomave dhe fryji sipas specifikimeve. Verifiko nëse ka shpim ose rrjedhje.';
  }
  if (/timon|drejtim/.test(text)) {
    return 'Ule shpejtësinë dhe shmang kthesat e forta. Kontrollo sistemin e drejtimit dhe shko në servis.';
  }
  if (/airbag|rrip/.test(text)) {
    return 'Sistemet e sigurisë mund të jenë të kufizuara. Sigurohu që rripat janë vendosur dhe diagnostiko sistemin e airbag-ut menjëherë.';
  }
  if (/tërheq|tcs|esp|stability|awd|4wd/.test(text)) {
    return 'Ngas me kujdes në rrugë me kapje të ulët dhe shmang përshpejtimin e fortë. Kontrollo sistemin e tërheqjes/transmisionit.';
  }
  if (/transmision|gearbox|powertrain|fuqi/.test(text)) {
    return 'Shmang ngarkesën e rëndë dhe përshpejtimin agresiv. Kryej diagnostikim të transmisionit/sistemit të fuqisë sa më shpejt.';
  }
  if (/karburant|filter|filtr|adblue|shkarkim|diesel/.test(text)) {
    return 'Mbush lëngjet e nevojshme dhe kontrollo filtrat/sistemin e karburantit. Nëse drita nuk fiket, shko në servis.';
  }

  return `Problemi i mundshëm: ${summary}. Ule ngarkesën e makinës dhe bëj kontroll teknik nëse paralajmërimi vazhdon.`;
};

const buildWarningTypeFromDescription = description => {
  const text = normalizeDescription(description).toLowerCase();
  if (!text) {
    return 'info';
  }

  if (/temperatur|mbinxeh|presionin e vajit|humbjen e presionit|frenave|hidraulik/.test(
      text)) {
    return 'danger';
  }

  if (/bateri|alternator|karik|presionit të gomave|drejtim|airbag|rrip|tërheq|tcs|esp|transmision|fuqi|karburant|filtr|adblue|service|servis/.test(
      text)) {
    return 'warning';
  }

  return 'info';
};

export const CarLightsAl = [
  {
    'name': 'Drita paralajmëruese e temperaturës së motorit',
    'description': 'Drita treguese do të thotë se temperatura e motorit ka tejkaluar kufijtë normalë Kontrollo nivelin e ftohësit, funksionimin e ventilatorit, kapakun e radiatorit, rrjedhjet e ftohësit',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2019/06/GOFAR_car-dashboard-symbols-engine-temperature-warning-light.jpg',
    'image_path': require(
      '../assets/car-light/Engine_Temperature_Warning_Light.jpg'),
  },
  {
    'name': 'Drita paralajmëruese e karikimit të baterisë',
    'description': 'Drita treguese do të thotë që sistemi i karikimit të makinës ka mungesë të energjisë ose nuk po karikohet siç duhet. Normalisht tregon një problem me vetë baterinë ose alternatorin',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-battery-charge.jpg',
    'image_path': require(
      '../assets/car-light/Battery_Charge_Warning_Light.jpg'),
  },
  {
    'name': 'Drita paralajmëruese për presionin e vajit',
    'description': 'Drita treguese nënkupton humbjen e presionit të vajit, që do të thotë se lubrifikimi është i ulët ose i humbur plotësisht. Kontrolloni menjëherë nivelin dhe presionin e vajit',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/283092_Car-Dashboard-Symbols_oil-pressure_090618.jpg',
    'image_path': require('../assets/car-light/Oil_Pressure_Warning_Light.jpg'),
  },
  {
    'name': 'Drita paralajmëruese e frenave',
    'description': 'Drita treguese ndizet kur frena e dorës është ndezur Nëse ndizet vazhdimisht, kjo do të thotë se presioni hidraulik ka humbur në njërën anë të sistemit të frenave ose se niveli i lëngut në cilindrin kryesor është i ulët (për shkak të një rrjedhjeje diku në sistemin e frenave )',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-brake.jpg',
    'image_path': require('../assets/car-light/Brake_Warning_Light.jpg'),
  },
  {
    'name': 'Temperatura e transmetimit',
    'description': 'Drita treguese do të thotë se temperatura e motorit ka tejkaluar kufijtë normalë Kontrollo nivelin e ftohësit, funksionimin e ventilatorit, kapakun e radiatorit, rrjedhjet e ftohësit',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-transmission-temp.jpg',
    'image_path': require('../assets/car-light/Transmission_Temperature.jpg'),
  },
  {
    'name': 'Drita paralajmëruese e presionit të gomave',
    'description': 'Drita treguese do të thotë se presioni është i ulët në një nga gomat tuaja',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-time-pressure.jpg',
    'image_path': require(
      '../assets/car-light/Tire_Pressure_Warning_Light.jpg'),
  },
  {
    'name': 'Kontrolli i tërheqjes është i fikur',
    'description': 'Drita treguese do të thotë që TCS (sistemi i kontrollit të tërheqjes) të automjeteve është çaktivizuar.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-traction-control-off.jpg',
    'image_path': require('../assets/car-light/Traction_Control_Off.jpg'),
  },
  {
    'name': 'Kyçja e timonit',
    'description': 'Drita treguese do të thotë që timoni juaj është i kyçur dhe nuk mund të lëvizet. Për të fikur bllokimin e timonit, futeni çelësin në ndezës dhe kthejeni atë të paktën në pozicionin e parë ndërsa rrotulloni timonin në të dy drejtimet',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-steering-wheel-lock.jpg',
    'image_path': require('../assets/car-light/Steering_Wheel_Lock.jpg'),
  },
  {
    'name': 'Paralajmërim për tërheqjen e rimorkios',
    'description': 'Dritat tregues nënkuptojnë që lidhësi i tërheqjes është i zhbllokuar ose se ka një problem me sistemin e ndriçimit.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-trailer-tow-hitch-warning.jpg',
    'image_path': require('../assets/car-light/Trailer_Tow_Hitch_Warning.jpg'),
  },
  {
    'name': 'Drita e kontrollit të tërheqjes',
    'description': 'Drita treguese ndizet kur aktivizohet TCS e automjetit (sistemi i kontrollit të tërheqjes).',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-traction-control-light.jpg',
    'image_path': require('../assets/car-light/Traction_Control_Light.jpg'),
  },
  {
    'name': 'Makina e servisit se shpejti',
    'description': 'Drita treguese ndizet kur ka një gjendje defekti në një zonë të sistemeve të shasisë së automjetit të tilla si sistemi i frenimit kundër bllokimit (ABS), sistemi i kontrollit të tërheqjes (TCS), sistemi elektronik i pezullimit ose sistemi hidraulik i frenave',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-sevice-vehicle-soon.jpg',
    'image_path': require('../assets/car-light/Service_Vehicle_Soon.jpg'),
  },
  {
    'name': 'Alarm sigurie',
    'description': 'Drita treguese do të ndizet për një çast nëse çelësi i ndezjes është i kyçur dhe do ti duhet ajo e duhura',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-security-alert.jpg',
    'image_path': require('../assets/car-light/Security_Alert.jpg'),
  },
  {
    'name': 'Airbag anësor',
    'description': 'Drita treguese nënkupton një defekt me airbag-in anësor',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-side-airbag.jpg',
    'image_path': require('../assets/car-light/Side_Airbag.jpg'),
  },
  {
    'name': 'Paralajmërim për energji të reduktuar',
    'description': 'Drita treguese do të thotë që kompjuteri i motorit ka fuqi të kufizuar në dalje të motorit.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-reduced-power-warning.jpg',
    'image_path': require('../assets/car-light/Reduced_Power_Warning.jpg'),
  },
  {
    'name': 'Treguesi i rripit të sigurimit',
    'description': 'Drita treguese nënkupton që një pasagjer në automjet nuk i është vendosur rripi i sigurimit.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-seat-belt.jpg',
    'image_path': require('../assets/car-light/Seat_Belt_Indicator.jpg'),
  },
  {
    'name': 'Shtypni Pedalin e tufës',
    'description': 'Treguesi për të shtyrë tufën',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-press-clutch-pedal.jpg',
    'image_path': require('../assets/car-light/Press_Clutch_Pedal.jpg'),
  },
  {
    'name': 'Gabim i grupit të fuqisë',
    'description': 'Drita treguese ndizet kur zbulohet një defekt në sistemin e fuqisë ose AWD. Kontaktoni me mekanikun tuaj sa më shpejt të jetë e mundur.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-powertrain-fault.jpg',
    'image_path': require('../assets/car-light/Powertrain Fault.jpg'),
  },
  {
    'name': 'Llamba e fikur',
    'description': 'Drita treguese do të thotë se ka një dritë të jashtme në automjet që nuk funksionon siç duhet.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-lamp-out.jpg',
    'image_path': require('../assets/car-light/Lamp_Out.jpg'),
  },
  {
    'name': 'Drita paralajmëruese e drejtimit të energjisë',
    'description': 'Drita treguese ndizet nëse ka një problem me sistemin e drejtimit të energjisë dhe do të çaktivizohet derisa të rregullohet.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-power-steering-warning.jpg',
    'image_path': require(
      '../assets/car-light/Power_Steering_Warning_Light.jpg'),
  },
  {
    'name': 'Shtypni pedalin e frenave',
    'description': 'Treguesi për të shtyrë pedalin e frenave',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-press-brake-pedal.jpg',
    'image_path': require('../assets/car-light/Press_Brake_Pedal.jpg'),
  },
  {
    'name': 'Drita e frenave të parkimit',
    'description': 'Drita treguese do të thotë se freni i parkimit është i ndezur',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-parking-brake-light.jpg',
    'image_path': require('../assets/car-light/Parking_Brake_Light.jpg'),
  },
  {
    'name': 'Dritë Overdrive',
    'description': 'Drita treguese do të thotë që sistemi i tejkalimit të automjetit është fikur manualisht.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-overdrive-light.jpg',
    'image_path': require('../assets/car-light/Overdrive_Light.jpg'),
  },
  {
    'name': 'Kujtesë për ndryshimin e vajit',
    'description': 'Drita treguese do të thotë që jeta e vajit ka skaduar',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-oil-change.jpg',
    'image_path': require('../assets/car-light/Oil_Change_Reminder.jpg'),
  },
  {
    'name': 'Drita kryesore paralajmëruese',
    'description': 'Drita treguese zakonisht shoqërohet nga një tjetër dritë paralajmëruese dhe tregon se një ose më shumë sisteme paralajmëruese kanë qenë',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-master-warning.jpg',
    'image_path': require('../assets/car-light/Master_Warning_Light.jpg'),
  },
  {
    'name': 'Drita paralajmëruese e informacionit',
    'description': 'Drita treguese do të ndizet kur një mesazh i ri ruhet në ekranin e informacionit. Do të jetë me ngjyrë të kuqe ose ngjyrë qelibar',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-information-light-warning.jpg',
    'image_path': require('../assets/car-light/Information_Warning_Light.jpg'),
  },
  {
    'name': 'Drita paralajmëruese e rrugës së akullt',
    'description': 'Drita treguese ndizet kur ajri i jashtëm fillon të arrijë temperaturat e ngrirjes, rreth 35°F ose 3°C.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-icy-road-warning-light.jpg',
    'image_path': require('../assets/car-light/Icy_Road_Warning_Light.jpg'),
  },
  {
    'name': 'Kapaku i gazit / karburantit',
    'description': 'Drita treguese ndizet nëse kapaku i gazit/karburantit nuk është shtrënguar siç duhet.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-gas-cap.jpg',
    'image_path': require('../assets/car-light/Gas_Fuel_Cap.jpg'),
  },
  {
    'name': 'Defekti ESP/Mosfunksionimi i kontrollit të tërheqjes',
    'description': 'Drita treguese do të thotë se ka një problem me kontrollin e tërheqjes së automjetit.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-esp-fault-traction-control-malfunction.jpg',
    'image_path': require(
      '../assets/car-light/ESP_Fault_Traction_Control_Malfunction.jpg'),
  },
  {
    'name': 'Frena elektrike e parkimit',
    'description': 'Drita treguese ndizet kur freni elektrik i parkimit ka një mosfunksionim.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-electric-park-brake.jpg',
    'image_path': require('../assets/car-light/Electric_Park_Brake.jpg'),
  },
  {
    'name': 'Paralajmërim për distancën',
    'description': 'Drita treguese do të thotë që një automjet përpara është shumë afër ose po afrohet shumë shpejt, ose se është i palëvizshëm',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-distance-warning.jpg',
    'image_path': require('../assets/car-light/Distance_Warning.jpg'),
  },
  {
    'name': 'Filtri i ajrit i bllokuar',
    'description': 'Drita treguese ndizet kur ka një fluks ajri të reduktuar në motorKa ndërruar ose inspektuar filtrin e ajrit.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-clogged-air-filter.jpg',
    'image_path': require('../assets/car-light/Clogged_Air_Filter.jpg'),
  },
  {
    'name': 'Bllokimi i sigurisë për fëmijët',
    'description': 'Drita treguese do të thotë që bllokimi i sigurisë për fëmijët është aktiv',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-child-safety-lock.jpg',
    'image_path': require('../assets/car-light/Child_Safety_Lock.jpg'),
  },
  {
    'name': 'Kontrolloni dritën e treguesit të motorit ose mosfunksionimit (MIL)',
    'description': 'Drita treguese ndizet sa herë që motori ndizet për të kontrolluar llambën Nëse drita qëndron e ndezur,',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-check-engine.jpg',
    'image_path': require(
      '../assets/car-light/Check_Engine_or_Malfunction_Indicator_Light_(MIL).jpg'),
  },
  {
    'name': 'Paralajmërim i konvertuesit katalitik',
    'description': 'Drita treguese do të thotë se konverteri katalitik ose po mbinxehet ose nuk funksionon siç është menduar.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-catalytic-converter-warning.jpg',
    'image_path': require(
      '../assets/car-light/Catalytic_Converter_Warning.jpg'),
  },
  {
    'name': 'Lëngu i frenave',
    'description': 'Drita treguese do të thotë që niveli i lëngut të frenave është i ulët',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-brake-fluid.jpg',
    'image_path': require('../assets/car-light/Brake_Fluid.jpg'),
  },
  {
    'name': 'Paralajmërim për bllokun e frenave',
    'description': 'Drita treguese do të thotë që jastëkët e frenave janë konsumuar',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-brake-pad.jpg',
    'image_path': require('../assets/car-light/Brake_Pad_Warning.jpg'),
  },
  {
    'name': 'Paralajmërim për dritat e frenave',
    'description': 'Drita treguese do të thotë se një llambë e jashtme e frenave është e dëmtuar. Kontrollo funksionimin e të gjithë dritës së jashtme të frenave',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-brake-lights-warning.jpg',
    'image_path': require('../assets/car-light/Brake_Lights_Warning.jpg'),
  },
  {
    'name': 'Paralajmërim i kutisë së shpejtësisë automatike',
    'description': 'Drita treguese do të thotë se ka një mosfunksionim të kutisë së shpejtësisë/transmisionit.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-automatic-gearbox-warning.jpg',
    'image_path': require('../assets/car-light/Automatic_Gearbox_Warning.jpg'),
  },
  {
    'name': 'Sistemi i frenimit kundër bllokimit (ABS)',
    'description': 'Drita treguese do të thotë se mund të ketë një mosfunksionim në sistemin ABS',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-anti-lock-braking-system.jpg',
    'image_path': require(
      '../assets/car-light/Anti-lock_Braking_System_(ABS).jpg'),
  },
  {
    'name': 'Drive me të gjitha rrotat (AWD/4WD)',
    'description': 'Drita treguese ndizet kur ka një mosfunksionim me sistemin 4WD.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-all-wheel-drive.jpg',
    'image_path': require('../assets/car-light/All_Wheel_Drive_(AWD_4WD).jpg'),
  },
  {
    'name': 'Treguesi i airbag-it',
    'description': 'Drita treguese ndizet kur jastëku i përparmë i ajrit fiket Nëse kjo llambë ndizet ose pulson, ka një defekt në',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-airbag.jpg',
    'image_path': require('../assets/car-light/Airbag_Indicator.jpg'),
  },
  {
    'name': 'Airbag i çaktivizuar',
    'description': 'Drita treguese ndizet kur ka një defekt në sistemin e spoilerit të pasmë.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-airbag-deactivated.jpg',
    'image_path': require('../assets/car-light/Airbag_Deactivated.jpg'),
  },
  {
    'name': 'Amortizues me suspension adaptues',
    'description': 'Drita treguese do të thotë se është e nevojshme të kontaktoni një riparues të autorizuar.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-adaptive-suspension-dampers.jpg',
    'image_path': require(
      '../assets/car-light/Adaptive_Suspension_Dampers.jpg'),
  },
  {
    'name': 'Drita treguese e bllokimit të 4 rrotave (4WD).',
    'description': 'Drita treguese do të thotë që modaliteti i kyçjes 4WD të automjetit është aktivizuar.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-4WD-lock-indicator.jpg',
    'image_path': require(
      '../assets/car-light/4_Wheel_Drive_(4WD)_LOCK_Indicator_Light.jpg'),
  },
  {
    'name': 'Pezullimi me ajër',
    'description': 'Drita treguese do të thotë se ka një problem me çantat e pezullimit të ajrit, me gjasë për shkak të një rrjedhjeje ose problemi me fryrje.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-air-suspension.jpg',
    'image_path': require('../assets/car-light/Air_Suspension.jpg'),
  },
  {
    'name': 'Drita treguese e rrezeve të ulëta',
    'description': 'Drita treguese do të thotë që drita e ulët e automjetit është ndezur',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-low-beam-indicator-light.jpg',
    'image_path': require('../assets/car-light/Low_Beam_Indicator_Light.jpg'),
  },
  {
    'name': 'Treguesi i dritës së rrezeve të larta',
    'description': 'Drita treguese do të thotë se fenerët e dritave të gjata të makinës suaj janë ndezur ose nëse përdoret funksioni i blicit të rrezeve të gjata.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-high-beam-light-indicator.jpg',
    'image_path': require('../assets/car-light/High_Beam_Light_Indicator.jpg'),
  },
  {
    'name': 'Kontrolli i rrezes së fenerëve',
    'description': 'Drita treguese ndizet nëse zbulohet një problem me sistemin e kontrollit të rrezes së fenerëve.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-headlight-range-control.jpg',
    'image_path': require('../assets/car-light/Headlight_Range_Control.jpg'),
  },
  {
    'name': 'Dritat e përparme të mjegullës',
    'description': 'Drita treguese do të thotë se dritat e përparme të mjegullës janë ndezur',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-front-fog-light.jpg',
    'image_path': require('../assets/car-light/Front_Fog_Lights.jpg'),
  },
  {
    'name': 'Gabim i dritës së jashtme',
    'description': 'Drita treguese do të thotë se çdo dritë e jashtme në makinën tuaj nuk funksionon',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-exterior-light-fault.jpg',
    'image_path': require('../assets/car-light/Exterior_Light_Fault.jpg'),
  },
  {
    'name': 'Auto High Stre',
    'description': 'Drita treguese do të thotë se sistemi Auto High Beam ka ndezur fenerët me rreze të lartë.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-auto-high-beam.jpg',
    'image_path': require('../assets/car-light/Auto_High_Beam.jpg'),
  },
  {
    'name': 'Sistemi i dritës përshtatëse',
    'description': 'Drita treguese do të ndizet kur fenerët përshtatës janë të ndezur',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-adaptive-light-system.jpg',
    'image_path': require('../assets/car-light/Adaptive_Light_System.jpg'),
  },
  {
    'name': 'Treguesi i dritës anësore',
    'description': 'Drita treguese do të ndizet kur janë në përdorim fenerët normalë',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-side-light-indicator-light.jpg',
    'image_path': require('../assets/car-light/Side_Light_Indicator.jpg'),
  },
  {
    'name': 'Dritat e pasme të mjegullës janë ndezur',
    'description': 'Drita treguese do të thotë se dritat e pasme të mjegullës janë ndezur',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-rear-fog-lights.jpg',
    'image_path': require(
      '../assets/car-light/Rear_Fog_Lights_Switched_On.jpg'),
  },
  {
    'name': 'Sensori i shiut dhe i dritës',
    'description': 'Drita treguese do të thotë se ka një problem me sistemin e sensorit. Fshirëset dhe dritat nuk do të funksionojnë',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-rain-and-light-sensor.jpg',
    'image_path': require('../assets/car-light/Rain_and_Light_Sensor.jpg'),
  },
  {
    'name': 'Shkrirja e xhamit të përparmë',
    'description': '        Drita treguese do të thotë që shkrirja e dritares është në punë.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-windshield-defrost.jpg',
    'image_path': require('../assets/car-light/Windshield_Defrost.jpg'),
  },
  {
    'name': 'Përkujtues i lëngut larëse',
    'description': 'Drita treguese tregon nëse rezervuari i lëngut të larjes së xhamit të xhamit është pothuajse bosh Mbushni rezervuarin e lëngut të larjes.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-water-fluid-reminder.jpg',
    'image_path': require('../assets/car-light/Washer_Fluid_Reminder.jpg'),
  },
  {
    'name': 'Shkrirja e dritares së pasme',
    'description': 'Drita treguese do të thotë që shkrirja e dritares së pasme është në punë',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-rear-window-defrost.jpg',
    'image_path': require('../assets/car-light/Rear_Window_Defrost.jpg'),
  },
  {
    'name': 'Niveli i ulët i karburantit',
    'description': 'Drita treguese do të thotë se karburanti i makinës po mbaron dhe së shpejti do të ketë nevojë për rimbushje.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-low-fuel-level.jpg',
    'image_path': require('../assets/car-light/Low_Fuel_Level.jpg'),
  },
  {
    'name': 'Çelësi jo në automjet',
    'description': 'Drita treguese do të thotë që çelësi nuk është në makinë',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-key-not-in-vehicle.jpg',
    'image_path': require('../assets/car-light/Key_Not_in_Vehicle.jpg'),
  },
  {
    'name': 'Kapuç/kapotë e hapur',
    'description': 'Drita treguese do të thotë që kapaku i makinës nuk është mbyllur mirë',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-hood-bonnet-open.jpg',
    'image_path': require('../assets/car-light/Hood_Bonnet_Open.jpg'),
  },
  {
    'name': 'Dritat e rrezikut janë ndezur',
    'description': 'Drita treguese do të thotë se dritat e rrezikut janë ndezur',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-hazard-lights-on.jpg',
    'image_path': require('../assets/car-light/Hazard_Lights_On.jpg'),
  },
  {
    'name': 'Tifoz',
    'description': 'Drita treguese do të thotë që ventilimi/tifoz i brendshëm është në punë.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-fan-green.jpg',
    'image_path': require('../assets/car-light/Fan.jpg'),
  },
  {
    'name': 'Dera e hapur',
    'description': 'Drita treguese ndizet kur një ose më shumë dyer të makinës nuk mbyllen siç duhet.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-door-ajar.jpg',
    'image_path': require('../assets/car-light/Door_Ajar.jpg'),
  },
  {
    'name': 'Treguesit e drejtimit/sinjalit',
    'description': 'Drita treguese do të thotë që një nga sinjalet e kthesës (majtas ose djathtas) është aktivizuar.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-direction-signal-indicators.jpg',
    'image_path': require(
      '../assets/car-light/Direction_Signal_Indicators.jpg'),
  },
  {
    'name': 'Makinë në rampë',
    'description': 'Drita treguese do të thotë se automjeti është në një sistem rampe/jack',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-car-on-ramp.jpg',
    'image_path': require('../assets/car-light/Car_on_Ramp.jpg'),
  },
  {
    'name': 'Ajri i riqarkulluar i kabinës',
    'description': '        Drita treguese do të thotë që sistemi i ventilimit të automjetit po riqarkullon ajrin nga brenda automjetit,',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-recirculated-cabin-air.jpg',
    'image_path': require('../assets/car-light/Recirculated_Cabin_Air.jpg'),
  },
  {
    'name': 'Paralajmërim për spoilerin e pasmë',
    'description': 'Drita treguese ndizet kur ka një defekt në sistemin e spoilerit të pasmë.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-rear-spoiler-warning.jpg',
    'image_path': require('../assets/car-light/Rear_Spoiler_Warning.jpg'),
  },
  {
    'name': 'Parkimi me pilotin e ndihmës në park',
    'description': 'Drita treguese do të thotë se PAP (Park Assist Pilot) është aktivizuar',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-parking-with-park-assist-pilot.jpg',
    'image_path': require(
      '../assets/car-light/Parking_with_Park_Assist_Pilot.jpg'),
  },
  {
    'name': 'Paralajmërim për largim nga korsia',
    'description': 'Drita treguese do të thotë se mjeti zbulohet se po lëviz nga korsia e tij aktuale pa sinjalizuar.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-lane-departure-warning.jpg',
    'image_path': require('../assets/car-light/Lane_Departure_Warning.jpg'),
  },
  {
    'name': 'Ndihma në korsi',
    'description': 'Drita treguese ndizet kur sistemi i ndihmës së korsisë është i ndezur dhe shenjat e rrugës mund të zbulohen.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-lane-assist.jpg',
    'image_path': require('../assets/car-light/Lane_Assist.jpg'),
  },
  {
    'name': 'Bateria e tastit të ulët',
    'description': 'Drita treguese ju lejon të dini kur bateria e çelësit të fob-it duhet të ndërrohet dhe të zëvendësohet, në mënyrë që të mund të vazhdoni ta përdorni',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-key-fob-battery-low.jpg',
    'image_path': require('../assets/car-light/Key_Fob_Battery_Low.jpg'),
  },
  {
    'name': 'Paralajmërim i çelësit të ndezjes',
    'description': 'Drita treguese do të thotë se ka një problem me sistemin e ndezjes ose çelësin e makinës, mund të jetë për shkak të një defekti ose konsumimi',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-ignition-switch-warning.jpg',
    'image_path': require('../assets/car-light/Ignition_Switch_Warning.jpg'),
  },
  {
    'name': 'Kontrolli i zbritjes së kodrës',
    'description': 'Drita treguese ndizet kur sistemi aktivizohet dhe ju ndihmon të ruani një shpejtësi specifike gjatë uljes a',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-hill-descent-control.jpg',
    'image_path': require('../assets/car-light/Hill_Descent_Control.jpg'),
  },
  {
    'name': 'Paralajmërim për përplasje përpara',
    'description': 'Drita treguese ndizet kur zbulohet një përplasje e mundshme',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-forward-collision.jpg',
    'image_path': require('../assets/car-light/Forward_Collision_Warning.jpg'),
  },
  {
    'name': 'Treguesi Eko Driving',
    'description': 'Drita treguese do të ndizet kur të aktivizohet funksioni Eco',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-eco-driving-indicator.jpg',
    'image_path': require('../assets/car-light/Eco_Driving_Indicator.jpg'),
  },
  {
    'name': 'Kontrolli i lundrimit',
    'description': 'Drita treguese do të thotë se sistemi i kontrollit të lundrimit është aktivizuar',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-cruise-control.jpg',
    'image_path': require('../assets/car-light/Cruise_Control.jpg'),
  },
  {
    'name': 'Drita paralajmëruese e çatisë së konvertueshme',
    'description': 'Drita treguese do të ndizet ndërsa çatia hapet ose mbyllet Nëse llamba ndizet vazhdimisht, çatia është',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-convertible-roof-warning-light.jpg',
    'image_path': require(
      '../assets/car-light/Convertible_Roof_Warning_Light.jpg'),
  },
  {
    'name': 'Drita treguese e mbajtjes së frenave',
    'description': 'Drita treguese do të thotë që sistemi i frenimit po funksionon siç duhet.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-brake-hold-indicator.jpg',
    'image_path': require('../assets/car-light/Brake_Hold_Indicator_Light.jpg'),
  },
  {
    'name': 'Drita treguese e pikës së verbër',
    'description': 'Drita treguese ndizet kur zbulohet një automjet ose pengesë në pikën e verbër.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-blind-spot-indicator.jpg',
    'image_path': require('../assets/car-light/Blind_Spot_Indicator_Light.jpg'),
  },
  {
    'name': 'Fshirja automatike e xhamit të përparmë',
    'description': 'Drita treguese do të thotë që fshirëset e xhamit të përparmë janë në funksion në modalitetin automatik.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-auto-windscreen-wiping.jpg',
    'image_path': require('../assets/car-light/Auto_Windscreen_Wiping.jpg'),
  },
  {
    'name': 'Frenimi automatik i urgjencës (AEB)',
    'description': 'Drita treguese ndizet kur sistemi AEB është i fikur ose kur sensori ose mbulesa e radarit është e bllokuar me papastërti ose',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-automatic-emegency-braking.jpg',
    'image_path': require(
      '../assets/car-light/Automatic_Emergency_Braking_(AEB).jpg'),
  },
  {
    'name': 'Kontrolli adaptiv i lundrimit',
    'description': 'Drita treguese do të thotë që ACC (Adaptive Cruise Control) është në punë.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-adaptive-cruise-control.jpg',
    'image_path': require('../assets/car-light/Adaptive_Cruise_Control.jpg'),
  },
  {
    'name': 'Modaliteti dimëror',
    'description': 'Drita treguese ju lejon të dini se jeni duke vozitur në modalitetin dimëror',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-winter-mode.jpg',
    'image_path': require('../assets/car-light/Winter_Mode.jpg'),
  },
  {
    'name': 'Drita paralajmëruese e nisjes/ndalimit',
    'description': 'Drita treguese ndizet për të informuar drejtuesin se sistemi Inteligjent i Ndalimit / Nisjes është aktiv dhe motori ka qenë',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-start-stop-warning.jpg',
    'image_path': require('../assets/car-light/Start_Stop_Warning_Light.jpg'),
  },
  {
    'name': 'Kufizues i shpejtësisë',
    'description': 'Drita treguese do të thotë që funksioni i kufizuesit të shpejtësisë është aktivizuar',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-speed-limiter.jpg',
    'image_path': require('../assets/car-light/Speed_Limiter.jpg'),
  },
  {
    'name': 'Temperatura e sediljes',
    'description': 'Drita treguese do të thotë që rryma e ajrit shpërndahet midis dritares së përparme, xhamit të përparmë dhe heqjes së mjegullës së hapësirës së këmbëve',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-seat-temperature.jpg',
    'image_path': require('../assets/car-light/Seat_Temperature.jpg'),
  },
  {
    'name': 'Treguesi i prizës së ndriçimit',
    'description': 'Drita treguese do të thotë që prizat e ndriçimit të motorit po ngrohen dhe motori nuk duhet të ndizet derisa',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-glow-plug.jpg',
    'image_path': require('../assets/car-light/Glow_Plug_Indicator.jpg'),
  },
  {
    'name': 'Paralajmërim për filtrin e karburantit',
    'description': 'Drita treguese do të thotë që filtri i karburantit të naftës është plot dhe duhet të zbrazet për të shmangur dëmtimin e motorit.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-fuel-filter-warning.jpg',
    'image_path': require('../assets/car-light/Fuel_Filter_Warning.jpg'),
  },
  {
    'name': 'Lëngu i shkarkimit',
    'description': 'Drita treguese do të thotë që rezervuari i lëngut të shkarkimit të naftës ka pak lëng.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-exhaust-fluid.jpg',
    'image_path': require('../assets/car-light/Exhaust_Fluid.jpg'),
  },
  {
    'name': 'Depozita e AdBlue është bosh',
    'description': 'Drita treguese do të thotë që ju duhet të mbushni rezervuarin me më shumë lëng shkarkimi.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-adblue-tank-empty.jpg',
    'image_path': require('../assets/car-light/AdBlue_Tank_is_Empty.jpg'),
  },
  {
    'name': 'Mosfunksionimi i AdBlue',
    'description': 'Drita treguese do të thotë ose sistemi AdBlue po keqfunksionon ose sistemi nuk është i mbushur me standardin',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-adblue-tank-malfunction.jpg',
    'image_path': require('../assets/car-light/AdBlue_Malfunction.jpg'),
  },
  {
    'name': 'Paralajmërim për filtrin e lëngut të ujit',
    'description': 'Drita treguese do të thotë se uji në filtrin e karburantit ka arritur kapacitetin maksimal. Kulloni ujin nga filtri.',
    'image_url': 'https://www.gofar.co/wp-content/uploads/2018/10/car-dashboard-symbols-water-fluid-filter.jpg',
    'image_path': require('../assets/car-light/Water_Fluid_Filter_Warning.jpg'),
  },
  {
    'name': 'Paralajmërim për nivelin e ulët të vajit të motorit',
    'description': 'Tregon që niveli i vajit të motorit është ulur nën kufirin e poshtëm të pranueshëm. Kur ndizni motorin, drita paralajmëruese e nivelit të ulët të vajit duhet të ndizet për një kohë të shkurtër dhe më pas të fiket. Nëse nuk fiket, niveli i vajit është ose shumë i ulët ose ka një problem me sistemin e sensorit të nivelit të vajit',
    'image_path': require('../assets/car-light/ENGINE_LOW_OIL.jpeg'),
  },
].map(item => ({
  ...item,
  solution: item.solution ?? buildSolutionFromDescription(item.description),
  warningType: item.warningType ?? buildWarningTypeFromDescription(
      item.description),
}));
