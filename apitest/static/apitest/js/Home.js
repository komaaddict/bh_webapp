function loadTop6() {
	for (var i = 0; i < 6; i++) {
		document.getElementById("topLegend" + (i+1)).innerHTML = 
		`<div class="col-sm-6 mw-100 mh-100 w-50">
			<img src="static/apitest/img/Portraits/` + rank1v1_json[i].best_legend + `.png">
		</div>
		<div class="col-xs-6 text-center w-50">
			<p class="font-weight-bold">` + rank1v1_json[i].name + `</p>
			<p>` + rank1v1_json[i].tier + `</p>
			<p>` + rank1v1_json[i].region + `</p>
			<p>Wins:` + rank1v1_json[i].wins + `</p>
			<p>Lost:` + (rank1v1_json[i].games - rank1v1_json[i].wins) + `</p>
		</div>`;
	}

	$('.topLegendPanel').click(function(e) {
		var topNum = this.id[this.id.length-1]-1;
		location.href="/result/?ident=" + rank1v1_json[topNum].brawlhalla_id;
	})
}

function loadTwitch() {
	$.ajax({
		type: 'GET',
		url: "ajax/getTwitch",
		success: function(data) {
			data = JSON.parse(data);
			for(var i = 0; i < 3; i++) {
				document.getElementById(("twitchContainer")).innerHTML += 
				`<iframe
				    src="http://player.twitch.tv/?channel=` + data[i] + `&muted=true&autoplay=false"
				    height="300"
				    width="100%"
				    frameborder="no"
				    scrolling="no"
				    allowfullscreen="false">
				</iframe>`
			}
		}
	})
}

function getPlayerInfo() {
	var form = $('#searchPlayerForm');

	$(form).submit(function(event) {
		event.preventDefault();

		var formData = $(form).serialize();

		$.ajax({
			type: 'get',
			url: $(form).attr('action'),
			data: formData,

			success: function(data) {
				if(data == 'error') {
					console.log("No Such Player");
					document.getElementById("playerModalbody").innerHTML = `<h2>Player not found :(</h2>`;
				}

				else {
					data = JSON.parse(data);
					console.log(data);
					document.getElementById("playerModalbody").innerHTML ="";

					if(data.name != undefined)
						data = [data];

					for(var i = 0; i < Object.keys(data).length; i++) {
						document.getElementById("playerModalbody").innerHTML +=
						`<form class="form-inline" method="get" action="/result/">

							<h2 class="text-left">` + (i+1) + `.) ` + data[i].region + `:  ` + data[i].name + `</h2>
							
							<input id="playerFormSend` + i + `" type="hidden" name="ident" />

							<button class="btn btn-outline-warning  float-right" type="submit" data-toggle="modal"><i class="fas fa-search"></i></button>
						</form><br>`;
						document.getElementById('playerFormSend' + i).value = data[i].brawlhalla_id;
					}
				}
			}
		})
	})
}

$(document).ready(function() {
	loadTop6();
	loadTwitch();
	getPlayerInfo();
});