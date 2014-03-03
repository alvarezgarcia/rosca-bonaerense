#!/usr/bin/env perl

#Pregunta al servidor por los intendentes firmantes del acuerdo en Santa Teresita.

use strict;

open JSON_FILE, "< intendentes_firmantes_santa_teresita.txt";
while(<JSON_FILE>) {
	my $linea = $_;

	my ($partido, $intendente) = split(":", $linea);
	$partido =~ s/^\s+|\s+$//g;
	$intendente =~ s/^\s+|\s+$//g;

	print "---FIRMANTE---\n";
	print "Partido: $partido\n";
	print "Firmante: $intendente\n";

	$partido =~ s/ /_/g;
	my $cmd = "curl -s -X GET 'http://localhost:3000/rosca/$partido'";
	my $output = `$cmd`;

	if(!$output) {
		print "Sin respuesta por parte del servidor\n";
		print "DEBUG: $cmd\n";
		exit -1;
	}
	my @arr_response = split("\n", $output);
	print "\n---RESPUESTA---\n";
	foreach(@arr_response) {
		my $part = $_;
		if(index($part, "partido") != -1 || index($part, "nombre") != -1 || index($part, "agrupacion_actual") != -1) {
			$part =~ s/"(.*?)"/$1/g;
			$part =~ s/^\s+|\s+$//g;
			print ucfirst($part)."\n";
		}
	}
	print "\n-----------------------\n";
	<STDIN>;

}

exit 0;
