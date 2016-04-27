var Progress = React.createClass({
  render: function() {
    return (
      <div className="progress">
        <div className="progress-bar progress-bar-success progress-bar-striped active"
             style={{width:this.props.percentage}}>{this.props.percentage}</div>
      </div>
    );
  }
});

var ProgressNoJSX = React.createClass({
  render: function() {
    return (
      React.createElement('div', { className:'progress' },
        React.createElement('div',
          { className: 'progress-bar progress-bar-success progress-bar-striped active',
            style: { width: this.props.percentage }},
          React.createElement('span', null, this.props.percentage)
        )
      )
    )
  }
});

var ShowProgress = React.createClass({
  render: function() {
    return (
      <div>
      <div id="show-progress-without-jsx">
        <ProgressNoJSX percentage={this.props.percentage}/>
      </div>
      <br />
      <div id="show-progress-with-jsx">
      <Progress percentage={this.props.percentage} />
      </div>
      </div>
    );
  }
});


function renderProgress(percent){
  percent = String(percent) + "%";

  ReactDOM.render(
    <ShowProgress percentage={percent}/>,
    document.getElementById('show-progress-with-react')
  );
  
  
}

function updateProgress(percent){
  if (percent <= 100){
    setTimeout(function(){
      renderProgress(percent);
      updateProgress(percent + 5);
    }, 250);    
  }
}

updateProgress(5);




