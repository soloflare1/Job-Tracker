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
