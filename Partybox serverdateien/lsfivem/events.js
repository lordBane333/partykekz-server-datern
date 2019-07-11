exports = function(auth_data) {

    mp.events.add('updateTab', (text, online) => {
      let get_dat = text.replace(/\n/g, '').replace(/"/g, '"');
      auth_data.execute(`addTab('${get_dat}', '${online}');`);
    });

    mp.events.add('clearTab', () => {
      auth_data.execute(`clearTab();`);
    });

    mp.events.add('playerGUIStatsUpdate_1', (account) => {
      account = JSON.parse(account);
      account.group_id = (account.group_id == 0) ? "Игрок" : (account.group_id == 1) ? "Поддержка" : (account.group_id == 2) ? "Сотрудник" : (account.group_id == 3) ? "Администратор" : "-";
      auth_data.execute(`updateStats_1('${account.login}', '${account.group_id}', '${account.create_time}');`);
    });

    mp.events.add('playerGUIStats', (person) => {
      person = JSON.parse(person);
      auth_data.execute(`updateStatsMain('${person.g_money}');`);
    });

    mp.events.add('playerGUIStatsUpdate_2', (person, g_job_name, g_fraction_name, g_fraction_name_rang, g_gang_name, g_gang_name_rang) => {
      person = JSON.parse(person);
      person.g_sex = (person.g_sex == 0) ? "Мужской" : "Женский";
      auth_data.execute(`updateStats_2('${person.g_name}', '${person.g_sex}', '${person.g_money}', '${person.g_victims}', '${person.g_respect}', '${person.g_zavisim}', '${person.g_drugs}', '${person.g_materials}', '${g_job_name}', '${g_fraction_name}', '${g_fraction_name_rang}', '${g_gang_name}', '${g_gang_name_rang}');`);
    });

    mp.events.add('playerShowIDCard', (person, fraction, rang) => {
      person = JSON.parse(person);
      person.g_sex = (person.g_sex == 0) ? "Мужской" : "Женский";
      switch(person.g_fraction) {
        case 0: person.g_fraction = "-"; break;
      }
      switch(person.g_rang) {
        case 0: person.g_rang = "-"; break;
      }
      switch(person.g_job) {
        case 0: person.g_job = "-"; break;
      }
      auth_data.execute(`updateStats_10('${person.g_name}', '${person.g_sex}', '${person.g_victims}', '${person.g_respect}', '${fraction}', '${rang}', '${person.g_job}');`);
      auth_data.execute('$("#idcard_form_stats_1").fadeIn(1000);');
    });

    mp.events.add('updateSpeedometr_1', (car_name) => {
      auth_data.execute(`$("#speedometr_form").fadeIn(1000);`);
      auth_data.execute(`updateVehicleName('${car_name}');`);
      auth_data.execute(`updateVehicleSpeed(1);`);
    });

    mp.events.add('updateSpeedometr_2', () => {
      let speed = mp.players.local.getSpeed();
      speed = Math.floor(speed * 2.236936);
      auth_data.execute(`updateVehicleSpeedAction2('${speed}');`);
    });

    mp.events.add('disabledSpeedometr', () => {
      auth_data.execute(`$("#speedometr_form").fadeOut(1000);`);
      auth_data.execute(`updateVehicleSpeed(2);`);
    });

    mp.events.add('showHouseMenu', (house_number, house_info1, house_info2) => {
      let formated1 = house_info1.replace(/\n/g, '').replace(/"/g, '"');
      let formated2 = house_info2.replace(/\n/g, '').replace(/"/g, '"');
      auth_data.execute(`showHouseForm('${house_number}', '${formated1}', '${formated2}');`);
    });

    mp.events.add('freezePlayer', (type) => {
      if(type == "1") {
        mp.players.local.freezePosition(true);
      } else {
        mp.players.local.freezePosition(false);
      }
    });

    mp.events.add('showBlip', (x, y, z) => {
        mp.game.ui.addBlipForCoord(parseFloat(x), parseFloat(y), parseFloat(z));
    });

    mp.events.add('createPickup', (pickupHash, posX, posY, posZ, p4, value, p6, modelHash) => {
      mp.game.object.createPickup(parseInt(pickupHash), parseFloat(posX), parseFloat(posY), parseFloat(posZ), parseInt(p4), parseInt(value), true, parseInt(modelHash));
    });

    mp.events.add("doorControl", (doorHash,x,y,z,locked,p5, p6, p7) => {
        mp.game.object.doorControl(doorHash, parseFloat(x), parseFloat(y), parseFloat(z), locked, parseFloat(p5), parseFloat(p6), parseFloat(p7));
    });

    mp.events.add("setHeadBlendData", (shapeFirstID, shapeSecondID, shapeThirdID, skinFirstID, skinSecondID, skinThirdID, shapeMix, skinMix, thirdMix, isParent) => {
         mp.players.local.setHeadBlendData(parseInt(shapeFirstID), parseInt(shapeSecondID), parseInt(shapeThirdID), parseInt(skinFirstID), parseInt(skinSecondID), parseInt(skinThirdID), parseFloat(shapeMix), parseFloat(skinMix), parseFloat(thirdMix), true);
    });

    mp.events.add("changePlayerCameraPosition", (x,y,z,rx,ry,rz) => {
        var cam = mp.cameras.new('default',new mp.Vector3(parseFloat(x),parseFloat(y),parseFloat(z)),new mp.Vector3(parseFloat(rx),parseFloat(ry), parseFloat(rz) ),90.0);
        cam.setActive(true);
        mp.game.cam.renderScriptCams(true, false, 15000, true, false);
    });

    mp.events.add("changePlayerCameraPosition", (x,y,z,rx,ry,rz) => {
        var cam = mp.cameras.new('default',new mp.Vector3(parseFloat(x),parseFloat(y),parseFloat(z)),new mp.Vector3(parseFloat(rx),parseFloat(ry), parseFloat(rz) ),90.0);
        cam.setActive(true);
        mp.game.cam.renderScriptCams(true, false, 15000, true, false);
    });

    mp.events.add("returnPlayerCamera", function (time = 0) {
        mp.game.cam.renderScriptCams(false, true, time, true, false);
    });

    mp.events.add("gameChat", function (state) {
      if(state === 1) {
        mp.gui.chat.show(false);
        mp.game.ui.displayRadar(false);
      } else if(state === 2) {
        mp.gui.chat.show(true);
        mp.game.ui.displayRadar(true);
      }
    });

    mp.events.add("showMainMenu", function (state) {
      if(parseInt(state) == 1) {
        mp.gui.chat.show(false);
        auth_data.execute('mp.invoke("focus", true);');
        auth_data.execute('$("#mainmenu_form").fadeIn(1000);');
      } else if(parseInt(state) == 2) {
        auth_data.execute('$("#mainmenu_form").fadeIn(1000);');
        auth_data.execute('$("#mainmenu_form_stats_1").fadeOut(1000);');
        auth_data.execute('$("#mainmenu_form_stats_2").fadeOut(1000);');
      }
    });

    mp.events.add("showMainMenu_click", function (state, player) {
      if(parseInt(state) == 1) {
        auth_data.execute('$("#mainmenu_form").fadeOut(1000);');
        auth_data.execute('$("#mainmenu_form_stats_1").fadeIn(1000);');
      } else if(parseInt(state) == 2) {
        auth_data.execute('$("#mainmenu_form").fadeOut(1000);');
        auth_data.execute('$("#mainmenu_form_stats_2").fadeIn(1000);');
      } else if(parseInt(state) == 4) {
        auth_data.execute('$("#mainmenu_form").fadeOut(1000);');
        auth_data.execute('$("#mainmenu_form_stats_4").fadeIn(1000);');
      } else if(parseInt(state) == 6) {
        mp.gui.chat.show(true);
        auth_data.execute('mp.invoke("focus", false);');
        auth_data.execute('$("#mainmenu_form").fadeOut(1000);');
      } else {

      }
    });

    function hideVehicleButtons(player, vehicle, seat) {
        if (auth_data)
            auth_data.execute('$("#vehicle_buttons").fadeOut(250);');
    }
    mp.events.add('playerExitVehicle', hideVehicleButtons);
    mp.events.add('hideVehicleButtons', hideVehicleButtons);

    mp.events.add('playerEnteredVehicle', (player, vehicle, seat) => {
        if (auth_data)
            auth_data.execute('$("#vehicle_buttons").fadeIn(250);');
    });

    mp.events.add('chatInputActive', () => {
        if (auth_data)
            auth_data.execute(`setChatActive(true);`);
    });

    mp.events.add('chatInputInactive', () => {
        if (auth_data)
            auth_data.execute(`setChatActive(false);`);
    });

    /* GET ONLY NUMBERS BY SERVER */

    mp.events.add('return_server', (result) => {
        auth_data.execute('$("#return_server").text(' + result + ');');
    });

    /* GET ONLY MANY STRINGS, MAYBE ARRAY */

    mp.events.add('return_server_strings', (result) => {
        auth_data.execute('$("#return_server_strings").text("' + result + '");');
    });

    mp.events.add('cefData', function() {
        mp.events.callRemote('clientData', JSON.stringify(arguments));
    });
}
