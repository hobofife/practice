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

function renderProgress(percent){
  percent = String(percent) + "%";

  ReactDOM.render(
    <Progress percentage={percent} />,
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




