#! /usr/bin/env python
import sys, string
from Tkinter import *
from tkFileDialog import askopenfilename
from random import choice 
import re

class Flashcards:

    def __init__(self, master):

        frame = Frame(master)
        frame.pack()

	self.cvs = Canvas(frame, width=600, height=600)
	self.cvs.pack(side=TOP)

	self.fc1_id = self.cvs.create_text(230,200, text="", fill="purple", font="Helvectica 62 bold")

	self.fc2_id = self.cvs.create_text(230,400, text="", fill="purple", font="Helvectica 62 bold")

	self.cvs.pack()

	self.button = Button(frame, text="Load Flashcards", command=self.loadFlashcards)
	self.button.pack(side=LEFT, padx=5)

	self.button = Button(frame, text="Stop Flashing", command=self.stopFlashing)
	self.button.pack(side=LEFT, padx=5)

	self.button = Button(frame, text="Resume Flashing", command=self.resumeFlashing)
	self.button.pack(side=LEFT, padx=5)

	self.button = Button(frame, text="QUIT", command=root.destroy)
	self.button.pack(side=RIGHT)

	self.runstatus = 0

	LIGHTYELLOW = "#f9f08e"
	LIGHTGREEN = "#47f056"
	LIGHTBLUE = "#4747e8"
	DARKRED = "#5a0606"
	DARKGREEN = "#064316"
	DARKBLUE = "#06065b"
	self.MILLISECOND_DELAY = 1000
	self.FG_COLORS = [LIGHTYELLOW,LIGHTGREEN,LIGHTBLUE]
	self.BG_COLORS = [DARKRED,DARKGREEN,DARKBLUE]

    def loadFlashcards(self):

        filename = askopenfilename()
        if filename == "":
            return

        fdata = open(filename, 'r')
        self.all_lines = fdata.read().split('\n')

	# prevent lines that do not have exactly 2 tab-delimited items
	self.all_clean_lines = []
	for ln in self.all_lines:
	    line_items_check = string.split(ln,"\t")
	    if len(line_items_check) <> 2:  # ignore lines without 2 words
                continue
	    self.all_clean_lines.append(ln)

        if len(self.all_clean_lines) == 0:
            return

        self.resumeFlashing()

    def resumeFlashing(self):
        self.runstatus = 1
        self.fc_count = 1
        while self.runstatus == 1:
	    if self.fc_count == 1:
                randline = choice(self.all_clean_lines)
                words = string.split(randline,"\t")

            root.update()
            self.cvs.after(self.MILLISECOND_DELAY, self.animated_fc_loop(words,self.fc_count))

	    self.fc_count += 1

	    if self.fc_count > 2:
	        self.fc_count = 1

    def animated_fc_loop(self,fc_words,ani_fc_count):

        if ani_fc_count == 1:
            self.bg = choice(self.BG_COLORS)
            self.fg = choice(self.FG_COLORS)
      	    self.cvs.config(bg=self.bg)
            self.cvs.itemconfigure(self.fc1_id, text=fc_words[0],fill=self.fg)
            self.cvs.itemconfigure(self.fc2_id, text="")
        else:
            self.cvs.itemconfigure(self.fc1_id, text=fc_words[0])
            self.cvs.itemconfigure(self.fc2_id, text=fc_words[1],fill=self.fg)
    def stopFlashing(self):
        self.runstatus = 0

root = Tk()
root.title('Flashcards')

app = Flashcards(root)

root.mainloop()
