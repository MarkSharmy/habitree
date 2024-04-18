import AbstractView from "./AbstractView.js";

export default class extends AbstractView
{
    constructor(params)
    {
        super(params);
        this.setTitle("Habitree: Dashboard");
    }

    async getHtml()
    {
        return `        
            <div class="head-title">
                <h1>Dashboard</h1>
                <ul class="breadcrumb">
                    <li><a href="/dashboard/">Dashboard</a></li>
                    <li><i class="bx bx-chevron-right"></i></li>
                    <li><a href="/dashboard/" class="active" data-link>Home</a></li>
                </ul>
            </div>
            <div class="display">
                <div class="left">
                    <div class="date">
                        <h2>Today, 17th of April</h2>
                    </div>
                    <div class="tasks">
                        <ul class="task-list">
                            <li class="progress-bar">
                                1 / 4 (25%)
                            </li>
                            <li class="task">
                                <article class="task-entry">
                                    <p>Write JavaScript program</p>
                                    <div class="task-info">
                                        <time><i class='bx bx-time'></i>12.00</time>
                                        <span class="progress">Progress: Doing</span>
                                    </div>
                                </article>
                                <i class='bx bx-dots-vertical'></i>
                            </li>
                            <li class="btn-item"><button>Add</button></li>
                        </ul>
                    </div>
                </div>
                <div class="right">
                    <h2>Overview</h2>
                    <div class="time">
                        <h3>Current Output:</h3>
                        <div class="output">04:56:47</div>
                    <h3>Avg. Output 7(days):</h3>
                    <div class="line-chart"></div>
                        <h3>Efficiency:</h3>
                    <div class="progress-circle"></div>
                </div>
            </div>
        `;
    }
}