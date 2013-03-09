#!/usr/bin/ruby
require 'tk'

# Writen by Carl Olson
# More info at: carlsflashcards.com
# This program displays flashcards.  
# It is released under GPLv3.

# When the user presses the "Load Flashcard" 
# button, loadFlashcard is called, and it prompts 
# the user for a tab-delimited, 2-column text file.
# The first column of the loaded text file 
# contains the flashcards to display on top. The 
# second column contains the flashcards to display
# on the bottom.

class FlashcardBox

  def initialize
    ph = { 'padx' => 10, 'pady' => 10 } 
    pl = proc {loadFlashcard}
    pr = proc {runFlashcard}
    ps = proc {stopFlashcard}
  
    @@root = TkRoot.new { title "CarlsFlashcards.com - Ruby" }

    topFrame = TkFrame.new(@@root) do
      pack
    end
   
    buttonFrame = TkFrame.new(@@root) do
      pack
    end
   
    @@cvs = TkCanvas.new(topFrame)  do
     width=80
     height=40
     pack("side" => "top")
    end

    @@topFCVar = TkVariable.new
    @@top_fc_on_screen = TkLabel.new(@@cvs) do
      textvariable
      text 'Load Flashcard File'
      justify 'center'
      foreground "red"
      background "black"
      width 50
      height 3
      borderwidth 1
      font TkFont.new("Arial 68 bold")
      pack("side" => "top",  "padx"=> "5", "pady"=> "5")
    end
    @@top_fc_on_screen['textvariable'] = @@topFCVar

    @@bottomFCVar = TkVariable.new
    @@bottom_fc_on_screen = TkLabel.new(@@cvs) do
      textvariable
      text ''
      justify 'center'
      foreground "yellow"
      background "black"
      width 50
      height 3
      borderwidth 1
      font TkFont.new("Arial 58 bold")
      pack("side" => "top",  "padx"=> "5", "pady"=> "5")
   end
   @@bottom_fc_on_screen['textvariable'] = @@bottomFCVar

   TkButton.new(buttonFrame) do
     text 'Load Flashcard File';
     command pl;
     pack("side" => "left");
     pack ph;
   end

   TkButton.new(buttonFrame) do
     text 'Run Flashcards';
     command pr;
     pack("side" => "left");
     pack ph;
   end

   TkButton.new(buttonFrame) do
     text 'Stop Flashcards';
     command ps;
     pack("side" => "left");
     pack ph;
   end

   TkButton.new(buttonFrame) do 
     text 'Exit';
     command {proc exit};
     pack("side" => "left");
     pack ph;
    end
  end

  def loadFlashcard  
    # Dialog box for flashcard file

    flashcard_filename = Tk.getOpenFile

    if flashcard_filename.empty? == true
      return
    end

    open(flashcard_filename)
 
    flashcard_line = Array.new()
    @@topFC = Array.new()
    @@bottomFC = Array.new()

    array_of_lines = IO.readlines(flashcard_filename)

    array_of_lines.each do |line| 
      if line.strip.empty? == false  
        flashcard_line = line.split("\t")
      else
        break
      end
      if flashcard_line.length == 2   
        @@topFC.push(flashcard_line[0])
        @@bottomFC.push(flashcard_line[1])
      end    
    end
    @@topFCVar.value = 'File Loaded.'
  end

  def stopFlashcard  
    @@runStatus = 0  # '1' = Running.  '0' = Stopped
    @@tm.stop
  end  

  def runFlashcard  
   @@runStatus = 1  # '1' = Running.  '0' = Stopped
    @@fc_count = 1   # Count from 1 (top FC) to 2 (bottom FM).  Repeat.

    resumeFlashing
  end

  def resumeFlashing
    @@runStatus = 1
    @@fc_count = 1

# Run the 'animanted_fc_loop' routine every 1000 miliseconds (every second) 1,000,000 times  (After watching 1,000,000 times, you have probably successfully memorized your flashcard file:).
    @@tm=TkTimer.new(1000, 1000000, proc {animated_fc_loop})

    while @@runStatus == 1
      @@tm.start
      @@tm.wait
    end
  end


# animated_fc_loop: Repeatedly count from 1 to 2.  When at 1, only display the top flashcard.  When at 2, display both flashcards.
  def animated_fc_loop

    if @@fc_count == 1
      @random_line_number = rand(@@topFC.length)
      while @previous_random_line_number == @random_line_number do
        @random_line_number = rand(@@topFC.length)
      end
      @previous_random_line_number = @random_line_number

      @@topFCVar.value = @@topFC[@random_line_number]
      @@bottomFCVar.value = ''
    else
      @@topFCVar.value = @@topFC[@random_line_number]
      @@bottomFCVar.value = @@bottomFC[@random_line_number]
    end
      @@fc_count += 1

      if @@fc_count > 2
        @@fc_count = 1
      end
  end      
end

FlashcardBox.new
Tk.mainloop
