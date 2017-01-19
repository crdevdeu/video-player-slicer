###Reactjs-redux video player/slicer


##Instalation

-Install dependencies: npm install
-Start local development server: npm start

##Features:

-An HTML5 video player that utilizes media fragments  
-A list of clips to be played in the video player 
-The first item in the list should be the full video 
-An interface to add new clips to the list by specifying a name, start time, and end time. -The ability to delete clips from the list (excluding the full video item )  
-The ability to edit existing clips in the list  
-The ability to play clips in the video player 
-The ability to automatically jump to the next clip after it finishes, with a 3 second waiting  period and appropriate loading animation.  
-The ability to ‘save’ clips for persistent use.  -The ability to add arbitrary ‘tags’ to clips so that they can be filtered by the tag name.  -Hotkeys to jump between the current clip and next and previous clips (if there are any).   -Markers on the video player timeline that denote where a clip starts (full video only).Clicking the marker chooses that clip and plays it from that point.   
-The ability to reuse the the player and playlist on another page without the editing  capabilities 

##Usage

-New clips can be added specifying name, tage name,start time, end time on the interphase that shows after clicking on the "New clip button".

-The list of clips of user created clips will be rendered bellow the full video item.

-Video clips can be deleted and edited using the buttons displayed on the list of clips. In order to edit a clip an interphase to do so will render below the video.

-Clips can be played from the video player of from the list of clips.

-After a clip finishes it will jump to the next clip with a 3 second delay and animation.

-Clips can be saved for persistent use by clicking on the "save" button on each clip, a playlist will be created and it will persist after the browser is reloaded. Clicking on the button "Clear playlist" will clear the selected clips persistence.

-The list of clips can be filtered by tag name using the "Filter clips by tagname", all filtered clips will play in sequense skiping clips that were filtered out.

-Pressing the keys "p+n" will jump to the next clip and "p+b" to the previous one (just the letters not the "+" sign).

-Every time a clip is created a marker on the full video timeline is generated, clicking on the marker will play the clip that is associated to it.

-The main Reactjs component can be reused in any page without the editing capabilities changing the  "this.allowedit" class propierty from false to true in the constructor  of the ClipList component (/src/components/ClipList.js)

