let jobs = jobsData.map(j => ({...j}));
function updateStats()
{

    let iCnt = 0;
    let rCnt = 0;

    for(const job of jobs){
        if(job.status === 'interview')   iCnt++;
        if(job.status === 'rejected')   rCnt++;
    }
    document.getElementById('total').textContent = jobs.length;
    document.getElementById('interview').textContent = iCnt;
    document.getElementById('rejected').textContent = rCnt;

    const count = getVisibleJobs().length
    document.getElementById('job-count').textContent = count === 1 ? '1 job' : count + ' jobs';
 
}

function getVisibleJobs(){
    const store = [];
    for (const job of jobs) {
        if (currentTab === 'all' || job.status === currentTab)   store.push(job);
    }
    return store;
}


const  ACTIVE_CLASS = 'text-sm font-medium px-4 py-2 rounded bg-blue-600 text-white transition-all'
const  INACTIVE_CLASS = 'text-sm font-medium px-4 py-2 rounded text-gray-600 border border-gray-300 hover:bg-gray-100  transition-all'


function switchTab(tab){
    currentTab = tab;

    document.getElementById('tab-btn-all').className = tab === 'all'    ?  ACTIVE_CLASS : INACTIVE_CLASS;
    document.getElementById('tab-btn-interview').className = tab === 'interview'    ?  ACTIVE_CLASS : INACTIVE_CLASS;
    document.getElementById('tab-btn-rejected').className = tab === 'rejected'    ?  ACTIVE_CLASS : INACTIVE_CLASS;

    render();
}
function setStatus(id, status){
    for (const job of jobs) 
    {
        if (job.id === id ) {
            job.status = job.status === status ? 'none' : status ; 
            break;
        }
    }
    render();
}

function jobDelete(id){
    const  card = document.getElementById('card-' + id);
    card.style.opacity = '0';

    jobs = jobs.filter(j => j.id !== id);
    render();
}


function render(){
    updateStats();

    const seeJobs = getVisibleJobs();
    const list = document.getElementById('jobs');
    if(seeJobs.length === 0){
        const update = {
            all : ['No jobs available', 'Check back soon for new job opportunities'],
            interview : ['No interview yet', 'Check back soon.'],
            rejected : ['No jobs rejection', 'Check back soon.'],
        }
        const[title, sub] = update[currentTab];
        list.innerHTML = `
            <div style="display: flex; flex-direction:column; align-items:center;  padding:80px 20px; background:#fff;  border:1px solid #e5e7eb; border-radius:8px">
            <img src="jobs.png">
            <h2 style="font-weight:600;  color:#031761; margin-bottom:4px">${title}</h2>
            <p style="font-size:14px;  color:#9ca3af;">${sub}</p>
            </div>
        `;
        return;
    }
    let  html = ''

    for (const job of seeJobs) {
        const iBtnStyle = job.status === 'interview'?  'background:#22c55e;  color:#fff;  border:1px solid #22c55e;':  'background:#fff;  color: #22c55e;  border:1px solid #22c55e;';
        const rBtnStyle = job.status === 'rejected'?  'background:#ef4444;  color:#fff;  border:1px solid #ef4444;':  'background:#fff;  color: #ef4444;  border:1px solid #ef4444; ';
    
        const badgeStyle = job.status === 'interview'?  'background:#e8f4f8;  color:#3a7ca5;': job.status ==='rejected'? 'background:#fee2e2;  color: #ef4444;': 'background:#eff6ff;  color: #2563eb;';
        const badgeText = job.status === 'interview'?  'INTERVIEW' : job.status === 'rejected'?  'REJECTED' : 'NOT APPLIED';
    
        html += `
            <div id="card-${job.id}" style="background:#fff; border:1px solid #e5e7eb; border-radius:8px; padding:20px;">
            <div style="display:flex; justify-content: space-between; gap:16px;">
            <div>
            <p style="font-size:15px;  font-weight:700;  color:#031761; padding-bottom:12px">${job.company}</p>
            <p style="font-size:14px;  color:#6b7280;  margin-top:2px;">${job.position}</p>
            <p style="font-size:12px;  color:#9ca3af;  margin-top:6px;">${job.location} &bull; ${job.type} &bull; ${job.salary}</p>
            <span style="display: inline-block;  font-size:11px;  font-weight:600;   text-transform:uppercase;  padding:2px 10px; border-radius:4px;  margin-top: 8px;${badgeStyle}">${badgeText}</span>
            </div>

            <button onclick="jobDelete(${job.id})"    style="color:#d1d5db;   cursor:pointer;   background:none;  border:none;"
            onmouseover="this.style.color='#f87171'"   onmouseout="this.style.color='#d1d5db'" >

            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
               <path d="M2 4h12M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1M6 7v5M10 7v5M3 4l1 9a1 1 0 001 1h6a1 1 0 001-1l1-9"  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </button>
            </div>

            <p style="font-size:14px;  color:#6b7280;  margin-top:12px; line-height:1.6;">${job.description}</p>
            <div style=" display:flex;  gap:8px;  margin-top:12px;">
            <button onclick="setStatus(${job.id}, 'interview')"  style=" font-size:11px;  font-weight:600;  text-transform:uppercase;  padding:6px 14px;  border-radius:4px;  cursor:pointer;${iBtnStyle}">INTERVIEW</button>
            <button onclick="setStatus(${job.id}, 'rejected')"  style=" font-size:11px;  font-weight:600;  text-transform:uppercase;  padding:6px 14px;  border-radius:4px;  cursor:pointer;${rBtnStyle}">REJECTED</button>

            </div>

            </div>
        `
    }
    list.innerHTML = html;
}

render();
