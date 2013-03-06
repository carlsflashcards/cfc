#!/usr/bin/perl
#Written by Carl Olson
#carlsflashcards.com
#This code is released as GPLv3

use warnings;
use Tk;
require Tk::Dialog;
use strict;

my $NUMBER_OF_FLASHES_PER_PAGE = 2;
my $WIDTH = 1170;
my $HEIGHT = 700;

my $tot_lines_in_file; # to run the random function against
my @clean_lines; #lines with 2 tab-delimeted items (for fc1 and fc2)
my $flash_count = 1; # 1 = top flashcard, 2 = bottom flashcard
my $color_fc1 = '#ffffff';
my $color_fc2 = '#ffffff';
my $currently_flashing = 0; # become "1" when "Start Flashcards" button is pressed.
my $font_size_fc1 = 50;
my $font_size_fc2 = 50;
my $prev_rand = -1; # compare with current random to prevent duplicates
my $millisecond_delay = 1000; # can be altered with the scale widget
my $flashcard1;
my $flashcard2;

my $mw = MainWindow->new;
my $geo = $WIDTH . "x" . $HEIGHT;
$mw->geometry($geo);
$mw->title("Carl\'s Flashcards");
$mw-> bind('<Key-F1>',sub { help(); });

################
# Create Widgets
################        
my $c = $mw->Canvas(-width => $WIDTH, -height => $HEIGHT-100,  -background => ["black"]);
$c->pack(-fill=>"both",-expand=>"y");

# fc1 = top flashcard
# fc2 = bottom flashcard

my $fc1 = $c->createText(520, 75,
	-font => "Arial $font_size_fc1 bold",
	-fill => "#cccccc");
my $fc2 = $c->createText(520, 390,
	-font => "Arial $font_size_fc2 bold",
	-fill => "#cccccc");

###
# color frame to contain color label and the 2 flashcard color buttons

my $color_frm = $mw -> Frame(
	    -height => 20,
	    -width => 150,
        )->pack(-side =>"left", -anchor => 's');

$color_frm -> Label(-text=>"Font Colors", -font=>"ansi 12 bold") -> pack();
$color_frm -> Button(-text => " Top ", -command =>[\&chg_colors,'fc1'])->pack(-side =>"left", -anchor => 's');
$color_frm -> Button(-text => "Bottom", -command =>[\&chg_colors,'fc2'])->pack(-side =>"left", -anchor => 's');

###
 
###
# font_size frame to contain font-size label and the 2 flashcard font-size buttons

my $font_main_frm = $mw -> Frame(
	    -height => 20,
	    -width => 150,
        )->pack(
-side =>"left", -anchor => 's', -padx => '2');

$font_main_frm -> Label(-text=>"Font Size", -font=>"ansi 12 bold") -> pack(-side=>"top");

my $font_size_fc1_frm = $font_main_frm -> Frame(
	    -height => 20,
	    -width => 150,
        )->pack(-side =>"left");


$font_size_fc1_frm -> Label(-text=>" Top  ", -font=>"ansi 12 bold") -> pack(-side=>"top");
$font_size_fc1_frm -> Button(-text => "<", -command =>[\&chg_font_size,'fc1',"decr"])->pack(-side=>"left");
$font_size_fc1_frm -> Button(-text => ">", -command =>[\&chg_font_size,'fc1',"incr"])->pack(-side=>"left");

my $font_size_fc2_frm = $font_main_frm -> Frame(
	    -height => 20,
	    -width => 150,
        )->pack(-side =>"left", -anchor => 's', -padx => '2');
$font_size_fc2_frm -> Label(-text=>"Bottom", -font=>"ansi 12 bold") -> pack(-side=>"top");
$font_size_fc2_frm -> Button(-text => "<", -command =>[\&chg_font_size,'fc2',"decr"])->pack(-side=>"left");
$font_size_fc2_frm -> Button(-text => ">", -command =>[\&chg_font_size,'fc2',"incr"])->pack(-side=>"left");

###
 
my $btn_main_frm = $mw -> Frame(
	    -height => 20,
	    -width => 150,
        )->pack(-side =>"left", -anchor => 's', -padx => '25');

$btn_main_frm -> Button(-text => "Get File", -command =>\&open_file)->pack(-side =>"left", -anchor => 's', -padx => '8');
my $btn_start_flashcards = $btn_main_frm -> Button(-text => "Start Flashcards",-state => 'disabled', -command =>\&start_flashcards)->pack(-side =>"left", -anchor => 's', -padx => '1');
my $btn_next = $btn_main_frm -> Button(-text => "Next",-state => 'disabled', -command =>\&next_fc)->pack(-side =>"left", -anchor => 's', -padx => '1');
my $btn_pause = $btn_main_frm -> Button(-text => "Pause",-state => 'disabled', -command =>\&pause)->pack(-side =>"left", -anchor => 's', -padx => '1');
$btn_main_frm -> Button(-text => "Close", -command =>sub{exit})->pack(-side =>"left", -anchor => 's', -padx => '6');

###
# Scale is used in sub "Flash" to re-start after $millisecond_delay. 
$mw->Scale(
   -label     => 'Flash Speed (in milliseconds)',
   -orient    => 'horizontal',
   -from      => 5000,
   -to        => 100,
   -digits    => 4,
   -tickinterval => 0.2,
   -showvalue => 'yes',
   -length    => '2i',
   -variable  => \$millisecond_delay,
)->pack( -side => 'left', -anchor => 's', -padx => '5');

$mw -> Button(-text => "About", -command =>\&about)->pack(-side=>"left", -anchor => 's');
$mw -> Button(-text => "Help", -command =>\&help)->pack(-side=>"left", -anchor => 's');

###

&open_file;
 
MainLoop;

################
# Subroutines
################        
sub chg_colors {

    my $color_btn_type = $_[0];

	# This chunk of code - and the chunk at the bottom of the sub - uses $auto_run_is_on
	#   to stop and restart $currently_flashing (for "auto-pilot" mode), but only
	#   if it was turned on in the first place. Also used in subs "help" and "about".
    my $auto_run_is_on = 0;
    if ($currently_flashing == 1) {
        $auto_run_is_on = 1;
        $currently_flashing = 0;
    }
	###
	my $new_color = $mw->chooseColor(-title => 'Choose color', -initialcolor => '#cccccc');  
	if (defined $new_color) {
		if ($color_btn_type eq 'fc1') {
			$color_fc1 = substr($new_color,0,3) . substr($new_color,5,2) . substr($new_color,9,2);
			$c->itemconfigure($fc1, -fill => $color_fc1);
		} elsif ($color_btn_type eq 'fc2') {
			$color_fc2 = substr($new_color,0,3) . substr($new_color,5,2) . substr($new_color,9,2);
			$c->itemconfigure($fc2, -fill => $color_fc2);
		} else {
			print "problem in sub chg_colors";
		}
	}
	###
    if ($auto_run_is_on == 1) {
        $currently_flashing = 1;
		&start_flashcards;
    }
	###
}

sub chg_font_size {

    my $font_size_btn_type = $_[0];
    my $font_size_direction = $_[1];

	if ($font_size_btn_type eq 'fc1') {
		if ($font_size_direction eq "incr") {
			$font_size_fc1++;
		} else {
			$font_size_fc1--;
		}
		if ($currently_flashing == 1) {		
			$c->itemconfigure($fc1,-font => "Arial $font_size_fc1 bold");
		} else {
			$c->itemconfigure($fc1, -text => "(current size)",-font => "Arial $font_size_fc1 bold");
		}
	} elsif ($font_size_btn_type eq 'fc2') {
		if ($font_size_direction eq "incr") {
			$font_size_fc2++;
		} else {
			$font_size_fc2--;
		}
		if ($currently_flashing == 1) {		
			$c->itemconfigure($fc2,-font => "Arial $font_size_fc2 bold");
		} else {
			$c->itemconfigure($fc2, -text => "(current size)",-font => "Arial $font_size_fc2 bold");
		}
	} else {
		print "problem in sub chg_colors";
	}
}

sub open_file {

	$currently_flashing = 0;
	my $filename = $mw->getOpenFile( -title => 'Open File:',
		-defaultextension => '.txt', -initialdir => '.' );

	if (defined $filename) {
		open(MYFILE, $filename);
		my @lines = <MYFILE>;
		close (MYFILE); 

		# Ignore rows that don't have exactly 2 tab-delimited items (FC1 and FC2).
		foreach my $ln (@lines) {
		   my @line_test = split ("\t", $ln);
		   if (scalar(@line_test) == 2) { 
			   push (@clean_lines, $ln);
		   }
		}

		# Must have at least 3 lines of valid data.
		if (scalar(@clean_lines) < 3) { 
			my $d = $mw->Dialog(-title => "Invalid File", -text => "File $filename does not contain at least 3 rows of valid data.");
			$d->Show;
		   return;
		}

		$tot_lines_in_file = scalar(@clean_lines);

		$btn_start_flashcards->configure(-state => 'normal');
		$btn_next->configure(-state => 'normal');
		$btn_pause->configure(-state => 'normal');

		&start_flashcards;
	}
}

sub start_flashcards {

	$currently_flashing = 1;
	&flash;
}

sub next_fc {

	# $currently_flashing is only set to 1 when the user pressed the 
	#   "Start Flashcards" button to run on auto-pilot.
	$currently_flashing = 0; 
	&flash("Next");
}

sub pause {
    $currently_flashing = 0;
}

sub help {
    my $auto_run_is_on = 0;
    if ($currently_flashing == 1) {
        $auto_run_is_on = 1;
        $currently_flashing = 0;
    }

	my $d = $mw->Dialog(-title => "Help", -text => "1. Create flashcard text files. Each line should have 2 items separated by a tab. (You should have already done this)\n. 2. If you did not open a file when prompted on launching this program, do so now by clicking 'Get File'.\n 3. Then the flashcards will run on 'auto-pilot'.  Click 'Next' if you want to run one at a time.");
	$d->Show;

    if ($auto_run_is_on == 1) {
        $currently_flashing = 1;
		&start_flashcards;
    }
}

sub about {
    my $auto_run_is_on = 0;

    if ($currently_flashing == 1) {
        $auto_run_is_on = 1;
    }

	$currently_flashing = 0;
	my $d = $mw->Dialog(-title => "About", -text => "Created by Carl Olson. Visit carlsflashcards.com for more details.");
	$d->Show;
    if ($auto_run_is_on == 1) {
        $currently_flashing = 1;
		&start_flashcards;
    }
}

sub flash {

	my $random_line_number = 0;    
	my $source_btn_pressed;
    $source_btn_pressed = $_[0];
	if (! defined($source_btn_pressed)) {
		$source_btn_pressed = "";
	}

	if ($flash_count gt $NUMBER_OF_FLASHES_PER_PAGE) {
		$flash_count = 1;
	} 
	
	$random_line_number = int(rand($tot_lines_in_file));
	while ($prev_rand == $random_line_number) {
		$random_line_number = int(rand($tot_lines_in_file));
	}



	if ($flash_count eq 1)
	{
		($flashcard1, $flashcard2) = split ("\t", $clean_lines[$random_line_number]);
		utf8::decode($flashcard1) unless utf8::is_utf8($flashcard1);
		utf8::decode($flashcard2) unless utf8::is_utf8($flashcard2);

		# must check running second for each flash, since there is up to
		# a 5-second delay between flashes, and the user could have clicked "Pause".
		if (($currently_flashing == 1) or ($source_btn_pressed eq "Next")) {
			$c->itemconfigure($fc1,	-text => $flashcard1);
			$c->itemconfigure($fc2,	-text => "");
		}
	} else {
		if (($currently_flashing == 1) or ($source_btn_pressed eq "Next")) {
			$c->itemconfigure($fc1,	-text => $flashcard1);
			$c->itemconfigure($fc2,	-text => $flashcard2);
		}
	}
	$flash_count = $flash_count + 1;
	$mw->update;
	if ($currently_flashing == 1) {
		$mw->after($millisecond_delay, [\&flash]);
	}
}

