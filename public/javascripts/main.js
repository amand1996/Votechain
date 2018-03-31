$(document).ready(function () {

	var loc = window.location.href; // returns the full URL

	if (/register/.test(loc)) {
		$('#register').addClass('active');
	} else if (/vote/.test(loc)) {
		$('#vote').addClass('active');
	} else if (/results/.test(loc)) {
		$('#results').addClass('active');
	} else if (/admin/.test(loc)) {
		$('#admin').addClass('active');
	}

	var camera = new JpegCamera("#camera");

	var take_snapshots = function (count) {
		var snapshot = camera.capture();
		snapshot.get_canvas(add_snapshot);
	};

	var select_snapshot = function () {
		$(".item").removeClass("selected");
		var snapshot = $(this).addClass("selected").data("snapshot");
		snapshot.show();
	};

	var add_snapshot = function (element) {
		$(element).data("snapshot", this).addClass("item");

		var $container = $("#snapshots").append(element);
		var $camera = $("#camera");
		var camera_ratio = $camera.innerWidth() / $camera.innerHeight();

		var height = $container.height()
		element.style.height = "" + height + "px";
		element.style.width = "" + Math.round(camera_ratio * height) + "px";

		var scroll = $container[0].scrollWidth - $container.innerWidth();
	};

	$("#take_snapshots").click(function () {
		take_snapshots(1);
		$('#camera, #take_snapshots').hide();
		$('#snapshots').show();
		$('#register_btn').attr('disabled', false);
		setTimeout(function(){
			addImageToForm();
		}, 1000)
	});

	// $("#snapshots").on("click", ".item", select_snapshot);

	function addImageToForm() {
		var canvas = $('#snapshots > canvas').get(0);
		var imageData = canvas.toDataURL();
		document.getElementsByName("avatar")[0].setAttribute("value", imageData);
	}

	$('#register_btn').click(function () {
		$('#cam_col, #reg_col').hide();
		$('#register_row').append(`<div class="col-md-12">
									<div class="jumbotron jumbotron-fluid">
										<div class="container">
											<h1 class="display-4 text-center">Registration Completed</h1>
											<p class="lead text-center">
											Please Wait...
											Downloading your QR Code...
											<div>
												<div class="lds-css ng-scope"><div style="width:100%;height:100%" class="lds-ellipsis"><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div>
												<style type="text/css">
												@keyframes lds-ellipsis3 {
													0%, 25% {
													left: 32px;
													-webkit-transform: scale(0);
													transform: scale(0);
													}
													50% {
													left: 32px;
													-webkit-transform: scale(1);
													transform: scale(1);
													}
													75% {
													left: 100px;
													}
													100% {
													left: 168px;
													-webkit-transform: scale(1);
													transform: scale(1);
													}
												}
												@-webkit-keyframes lds-ellipsis3 {
													0%, 25% {
													left: 32px;
													-webkit-transform: scale(0);
													transform: scale(0);
													}
													50% {
													left: 32px;
													-webkit-transform: scale(1);
													transform: scale(1);
													}
													75% {
													left: 100px;
													}
													100% {
													left: 168px;
													-webkit-transform: scale(1);
													transform: scale(1);
													}
												}
												@keyframes lds-ellipsis2 {
													0% {
													-webkit-transform: scale(1);
													transform: scale(1);
													}
													25%, 100% {
													-webkit-transform: scale(0);
													transform: scale(0);
													}
												}
												@-webkit-keyframes lds-ellipsis2 {
													0% {
													-webkit-transform: scale(1);
													transform: scale(1);
													}
													25%, 100% {
													-webkit-transform: scale(0);
													transform: scale(0);
													}
												}
												@keyframes lds-ellipsis {
													0% {
													left: 32px;
													-webkit-transform: scale(0);
													transform: scale(0);
													}
													25% {
													left: 32px;
													-webkit-transform: scale(1);
													transform: scale(1);
													}
													50% {
													left: 100px;
													}
													75% {
													left: 168px;
													-webkit-transform: scale(1);
													transform: scale(1);
													}
													100% {
													left: 168px;
													-webkit-transform: scale(0);
													transform: scale(0);
													}
												}
												@-webkit-keyframes lds-ellipsis {
													0% {
													left: 32px;
													-webkit-transform: scale(0);
													transform: scale(0);
													}
													25% {
													left: 32px;
													-webkit-transform: scale(1);
													transform: scale(1);
													}
													50% {
													left: 100px;
													}
													75% {
													left: 168px;
													-webkit-transform: scale(1);
													transform: scale(1);
													}
													100% {
													left: 168px;
													-webkit-transform: scale(0);
													transform: scale(0);
													}
												}
												.lds-ellipsis {
													position: relative;
													margin: 0 auto; !important
												}
												.lds-ellipsis > div {
													position: absolute;
													-webkit-transform: translate(-50%, -50%);
													transform: translate(-50%, -50%);
													width: 40px;
													height: 40px;
												}
												.lds-ellipsis div > div {
													width: 40px;
													height: 40px;
													border-radius: 50%;
													background: #f00;
													position: absolute;
													top: 100px;
													left: 32px;
													-webkit-animation: lds-ellipsis 2.5s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
													animation: lds-ellipsis 2.5s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
												}
												.lds-ellipsis div:nth-child(1) div {
													-webkit-animation: lds-ellipsis2 2.5s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
													animation: lds-ellipsis2 2.5s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
													background: #3b4368;
												}
												.lds-ellipsis div:nth-child(2) div {
													-webkit-animation-delay: -1.25s;
													animation-delay: -1.25s;
													background: #5e6fa3;
												}
												.lds-ellipsis div:nth-child(3) div {
													-webkit-animation-delay: -0.625s;
													animation-delay: -0.625s;
													background: #689cc5;
												}
												.lds-ellipsis div:nth-child(4) div {
													-webkit-animation-delay: 0s;
													animation-delay: 0s;
													background: #93dbe9;
												}
												.lds-ellipsis div:nth-child(5) div {
													-webkit-animation: lds-ellipsis3 2.5s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
													animation: lds-ellipsis3 2.5s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
													background: #3b4368;
												}
												.lds-ellipsis {
													width: 200px !important;
													height: 200px !important;
													-webkit-transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
													transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
												}
												</style>
												</div>
											</div>
											</p>
										</div>
									</div>
								</div>`
							);
		});
	});

	function decodeQR() {
		var filesSelected = document.getElementById("qrimage").files;
		if (filesSelected.length > 0) {
			var fileToLoad = filesSelected[0];

			var fileReader = new FileReader();

			fileReader.onload = function (fileLoadedEvent) {
				QRdata = fileLoadedEvent.target.result;
				qrcode.decode(QRdata);

				qrcode.callback = function (decodedData) {
					console.log(decodedData);
				}
			};

			fileReader.readAsDataURL(fileToLoad);
		}
	}