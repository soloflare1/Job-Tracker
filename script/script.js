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