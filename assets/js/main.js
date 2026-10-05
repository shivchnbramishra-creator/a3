(function(){
  var b=document.querySelector('.burger'),n=document.getElementById('nav');
  if(b&&n)b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');});
  // Term of the day
  var T=[['Phoneme','phonology','The smallest unit of sound that can change meaning in a language, such as /p/ and /b/ in “pat” and “bat”.'],
    ['Morpheme','morphology','The smallest unit of meaning, such as “cat” and the plural “-s” in “cats”.'],
    ['Allophone','phonology','A variant pronunciation of a phoneme that does not change meaning, like the aspirated and unaspirated “p” in English.'],
    ['Syntax','grammar','The rules and patterns that govern how words combine into phrases and sentences.'],
    ['Pragmatics','meaning in context','How context, intention and shared knowledge shape what speakers actually mean.'],
    ['Lexicon','vocabulary','The mental dictionary of words and morphemes that a speaker knows.'],
    ['Cognate','historical linguistics','Words in different languages that share a common origin, like English “mother” and German “Mutter”.'],
    ['Dialect','sociolinguistics','A variety of a language associated with a region or social group, with its own patterns of pronunciation, vocabulary and grammar.'],
    ['Code-switching','sociolinguistics','Moving between two or more languages or varieties within a conversation.'],
    ['Affix','morphology','A bound morpheme attached to a root, such as a prefix (un-) or a suffix (-ness).'],
    ['Semantics','meaning','The study of meaning in words, phrases and sentences.'],
    ['Minimal pair','phonology','Two words that differ in only one sound, such as “ship” and “sheep”, used to identify phonemes.'],
    ['Pidgin','contact linguistics','A simplified language that develops when speakers without a common language need to communicate.'],
    ['Creole','contact linguistics','A stable, full language that develops from a pidgin and is learned by children as a first language.']];
  var d=new Date(),doy=Math.floor((d-new Date(d.getFullYear(),0,0))/864e5),t=T[doy%T.length],td=document.getElementById('tod');
  if(td){td.querySelector('h2').innerHTML=t[0]+' <small>'+t[1]+'</small>';td.querySelector('p').textContent=t[2];}
  // Language families
  var F={ie:['Indo-European','≈ 3.2 billion','≈ 450','Europe, South &amp; West Asia, the Americas',['English','Spanish','Hindi','Bengali','Russian','Portuguese','Persian','Punjabi'],'Descended from Proto-Indo-European, spoken perhaps 6,000 years ago. Branches include Germanic, Romance, Slavic, Celtic, Indo-Iranian and Greek.'],
    st:['Sino-Tibetan','≈ 1.4 billion','≈ 450','East Asia and the Himalayas',['Mandarin','Cantonese','Wu','Burmese','Tibetan','Karen'],'Includes the Chinese (Sinitic) languages and the very diverse Tibeto-Burman languages. Many use lexical tone to distinguish word meanings.'],
    nc:['Niger-Congo','≈ 700 million','≈ 1,500','West, Central, East and Southern Africa',['Swahili','Yoruba','Igbo','Zulu','Fula','Lingala','Shona'],'One of the largest families by number of languages. Many members use noun-class systems, and the Bantu branch spread across much of the continent.'],
    aa:['Afro-Asiatic','≈ 500 million','≈ 370','North Africa, the Horn of Africa, West Asia',['Arabic','Hausa','Amharic','Somali','Hebrew','Oromo','Tigrinya'],'Branches include Semitic, Berber, Chadic, Cushitic and Omotic, plus ancient Egyptian. Semitic languages are known for roots of three consonants.'],
    an:['Austronesian','≈ 380 million','≈ 1,250','Maritime Southeast Asia, the Pacific, Madagascar',['Indonesian','Malay','Javanese','Tagalog','Malagasy','Māori','Hawaiian'],'Spread by seafaring peoples across half the globe, from Madagascar to Easter Island. Often features reduplication, as in Malay “orang-orang” (people).'],
    dr:['Dravidian','≈ 250 million','≈ 80','South India and Sri Lanka',['Telugu','Tamil','Kannada','Malayalam','Tulu','Brahui'],'Tamil has one of the longest continuous literary traditions in the world. Dravidian languages are agglutinative, building words from chains of suffixes.']};
  var fb=document.querySelectorAll('[data-fam]');
  function fam(k){var f=F[k];document.getElementById('f-name').textContent=f[0];document.getElementById('f-sp').textContent=f[1];document.getElementById('f-ln').textContent=f[2];document.getElementById('f-rg').innerHTML=f[3];
    document.getElementById('f-langs').innerHTML=f[4].map(function(x){return '<span>'+x+'</span>';}).join('');document.getElementById('f-desc').textContent=f[5];
    fb.forEach(function(x){x.setAttribute('aria-pressed',x.dataset.fam===k?'true':'false');});}
  fb.forEach(function(x){x.addEventListener('click',function(){fam(x.dataset.fam);});});if(fb.length)fam('ie');
  // Morpheme splitter
  var M={unhappiness:[['un','prefix','“not”'],['happy','root','free morpheme'],['ness','suffix','makes a noun']],
    rewritable:[['re','prefix','“again”'],['write','root','free morpheme'],['able','suffix','makes an adjective']],
    teachers:[['teach','root','free morpheme'],['er','suffix','“one who”'],['s','infl','plural']],
    disagreements:[['dis','prefix','“opposite of”'],['agree','root','free morpheme'],['ment','suffix','makes a noun'],['s','infl','plural']],
    walked:[['walk','root','free morpheme'],['ed','infl','past tense']],
    careless:[['care','root','free morpheme'],['less','suffix','“without”']]};
  var LB={prefix:'Prefix',root:'Root',suffix:'Derivational suffix',infl:'Inflection'};
  var wb=document.querySelectorAll('[data-w]');
  function split(w){var m=M[w];document.getElementById('m-pieces').innerHTML=m.map(function(p){return '<div class="pc '+p[1]+'"><b>'+p[0]+'</b><small>'+LB[p[1]]+'</small></div>';}).join('');
    document.getElementById('m-desc').textContent='“'+w+'” has '+m.length+' morphemes: '+m.map(function(p){return p[0]+' ('+p[2]+')';}).join(' + ')+'.';
    wb.forEach(function(x){x.setAttribute('aria-pressed',x.dataset.w===w?'true':'false');});}
  wb.forEach(function(x){x.addEventListener('click',function(){split(x.dataset.w);});});if(wb.length)split('unhappiness');
  // Glossary filter
  var gs=document.getElementById('gq');
  if(gs){var items=document.querySelectorAll('.gterm'),cnt=document.getElementById('gcount'),em=document.getElementById('gempty');
    function filt(){var q=gs.value.trim().toLowerCase(),c=0;items.forEach(function(it){var ok=!q||it.textContent.toLowerCase().indexOf(q)>-1;it.hidden=!ok;if(ok)c++;});cnt.textContent=c+' term'+(c===1?'':'s');em.hidden=c>0;}
    gs.addEventListener('input',filt);filt();}
  // Contact form -> email app
  var cf=document.getElementById('cform');
  if(cf)cf.addEventListener('submit',function(ev){ev.preventDefault();if(cf.website.value)return;
    var body='Name: '+cf.name.value+'\nEmail: '+cf.email.value+'\nTopic: '+cf.topic.value+'\n\n'+cf.message.value;
    window.location.href='mailto:'+cf.dataset.to+'?subject='+encodeURIComponent('Website enquiry: '+cf.topic.value)+'&body='+encodeURIComponent(body);
    var s=document.getElementById('fm');s.hidden=false;s.textContent='Your email app should now open with your message ready to send. If it doesn’t, please email us directly at '+cf.dataset.to+'.';});
  // Cookie
  var c=document.getElementById('cookie'),v=null;try{v=localStorage.getItem('ls_cookie');}catch(e){}
  if(c&&!v)c.classList.add('show');
  document.querySelectorAll('[data-cookie]').forEach(function(x){x.addEventListener('click',function(){try{localStorage.setItem('ls_cookie',x.dataset.cookie);}catch(e){}c.classList.remove('show');});});
  var y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
})();
